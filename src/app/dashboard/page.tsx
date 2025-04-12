"use client";
import React from "react";
import { useUserStore } from "@/features/user/useUserStore";

const DashBoardPage = () => {
	const user = useUserStore((d) => d.user);
	return (
		<div className="p-4">
			<h1>Zustand</h1>
			<div>{user?.name}</div>
			<div>{user?.id}</div>
			<div>{user?.role}</div>
			<div>{user?.email}</div>
			<div>{user?.tenantId}</div>
		</div>
	);
};

export default DashBoardPage;
