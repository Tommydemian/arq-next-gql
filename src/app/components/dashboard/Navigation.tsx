import React from "react";
import Link from "next/link";
import { dashboardNavLinks } from "@/lib/data/dashboardNavLinks";

export const Navigation = () => {
	return (
		<nav className="min-h-16 bg-green-50 flex items-center justify-center">
			<ul className="flex items-center h-full gap-10 bg-green-300">
				{dashboardNavLinks.map((link) => (
					<li key={link.id}>
						<Link href={link.href}>{link.label}</Link>
					</li>
				))}
			</ul>
		</nav>
	);
};
