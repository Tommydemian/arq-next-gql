import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { mockDelay } from "@/lib/utils/mockDelay";
import type { Issue } from "@/features/issues/types";

export async function GET() {
	try {
		await mockDelay(500);
		const stmt = db.prepare("SELECT * FROM issues ORDER BY createdAt DESC");
		const issues = stmt.all();

		return NextResponse.json(issues);
	} catch (error) {
		console.error("Error fetching issues:", error);
		return NextResponse.json(
			{ error: "Failed to fetch issues" },
			{ status: 500 },
		);
	}
}

export async function POST(request: Request) {
	try {
		const data = await request.json();
		const { title, userId } = data;

		if (!title || !userId) {
			return NextResponse.json(
				{ error: "Title and userId are required" },
				{ status: 400 },
			);
		}

		const stmt = db.prepare(`
			INSERT INTO issues (title, description, status, priority, userId, createdAt, updatedAt)
			VALUES (?, ?, ?, ?, ?, datetime('now'), datetime('now'))
		`);

		const result = stmt.run(
			title,
			data.description || null,
			data.status || "backlog",
			data.priority || "medium",
			userId,
		);

		const createdIssue = {
			id: result.lastInsertRowid,
			...data,
		};

		return NextResponse.json(
			{ message: "Issue created successfully", issue: createdIssue },
			{ status: 201 },
		);
	} catch (error) {
		console.error("Error creating issue:", error);
		return NextResponse.json(
			{ error: "Failed to create issue" },
			{ status: 500 },
		);
	}
}
