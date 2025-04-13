import type { IssueWithUser } from "./types";

export async function getIssues(): Promise<IssueWithUser[]> {
	const res = await fetch("/api/issues");
	if (!res.ok) throw new Error("Failed to fetch issues");
	return res.json();
}
