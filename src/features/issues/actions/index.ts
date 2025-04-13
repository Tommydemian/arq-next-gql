"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/features/auth/getCurrentUser";
import { mockDelay } from "@/lib/utils/mockDelay";

// Zod validation schema
const IssueSchema = z.object({
	title: z
		.string()
		.min(3, "Title must be at least 3 characters")
		.max(100, "Title must be less than 100 characters"),

	description: z.string().optional().nullable(),

	status: z.enum(["backlog", "todo", "in_progress", "done"], {
		errorMap: () => ({ message: "Please select a valid status" }),
	}),

	priority: z.enum(["low", "medium", "high"], {
		errorMap: () => ({ message: "Please select a valid priority" }),
	}),

	userId: z.string().min(1, "User ID is required"),
});

export type IssueData = z.infer<typeof IssueSchema>;

export type ActionResponse = {
	success: boolean;
	message: string;
	errors?: Record<string, string[]>;
	error?: string;
};

export async function createIssue(data: IssueData): Promise<ActionResponse> {
	try {
		await mockDelay(300);

		const user = getCurrentUser();
		if (!user) {
			return {
				success: false,
				message: "Unauthorized",
				error: "Unauthorized",
			};
		}

		const validation = IssueSchema.safeParse(data);
		if (!validation.success) {
			return {
				success: false,
				message: "Validation failed",
				errors: validation.error.flatten().fieldErrors,
			};
		}

		const stmt = db.prepare(`
      INSERT INTO issues (title, description, status, priority, userId)
      VALUES (?, ?, ?, ?, ?)
    `);

		stmt.run(
			data.title,
			data.description ?? null,
			data.status,
			data.priority,
			data.userId,
		);

		return {
			success: true,
			message: "Issue created successfully",
		};
	} catch (error) {
		console.error("Error creating issue:", error);
		return {
			success: false,
			message: "Failed to create issue",
			error: "Unexpected error",
		};
	}
}

export async function updateIssue(
	id: number,
	data: Partial<IssueData>,
): Promise<ActionResponse> {
	try {
		await mockDelay(300);

		const user = getCurrentUser();
		if (!user) {
			return {
				success: false,
				message: "Unauthorized access",
				error: "Unauthorized",
			};
		}

		const UpdateIssueSchema = IssueSchema.partial();
		const validationResult = UpdateIssueSchema.safeParse(data);

		if (!validationResult.success) {
			return {
				success: false,
				message: "Validation failed",
				errors: validationResult.error.flatten().fieldErrors,
			};
		}

		const validatedData = validationResult.data;
		const fields: string[] = [];
		const values: unknown[] = [];

		if (validatedData.title !== undefined) {
			fields.push("title = ?");
			values.push(validatedData.title);
		}

		if (validatedData.description !== undefined) {
			fields.push("description = ?");
			values.push(validatedData.description);
		}

		if (validatedData.status !== undefined) {
			fields.push("status = ?");
			values.push(validatedData.status);
		}

		if (validatedData.priority !== undefined) {
			fields.push("priority = ?");
			values.push(validatedData.priority);
		}

		if (fields.length === 0) {
			return {
				success: false,
				message: "No fields provided for update",
			};
		}

		fields.push("updatedAt = datetime('now')");
		values.push(id);

		const stmt = db.prepare(
			`UPDATE issues SET ${fields.join(", ")} WHERE id = ?`,
		);

		stmt.run(...values);

		return {
			success: true,
			message: "Issue updated successfully",
		};
	} catch (error) {
		console.error("Error updating issue:", error);
		return {
			success: false,
			message: "Failed to update issue",
			error: "Unexpected error",
		};
	}
}
