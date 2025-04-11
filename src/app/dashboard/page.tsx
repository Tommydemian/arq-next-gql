import React from "react";
import { redirect } from "next/navigation";
import { createUser } from "@/lib/graphql/mutations/createUser";

const DashBoardPage = async () => {
	const user = await createUser(`tomas${Date.now()}@example.com`, "Tomas SSR");

	if (!user) {
		redirect("/signin");
	}

	return (
		<div className="p-4">
			<h1>SSR User Created</h1>
			<pre>{JSON.stringify(user, null, 2)}</pre>
		</div>
	);
};

export default DashBoardPage;
