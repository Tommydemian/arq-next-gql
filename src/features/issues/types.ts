export type Issue = {
	id: number;
	title: string;
	description: string | null;
	status: "backlog" | "todo" | "in_progress" | "done";
	priority: "low" | "medium" | "high";
	createdAt: Date;
	updatedAt: Date;
	userId: string;
};

export type Status = "backlog" | "todo" | "in_progress" | "done";
export type Priority = "low" | "medium" | "high";

export type IssueWithUser = Issue & {
	user: {
		id: string;
		email: string;
	};
};
