import { redirect } from "next/navigation";
import IssueForm from "./IssueForm";
import { getCurrentUser } from "@/features/auth/getCurrentUser";

const NewIssue = async () => {
	const user = await getCurrentUser();

	if (!user) {
		redirect("/login");
	}

	return <IssueForm userId={String(user.id)} />;
};

export default NewIssue;
