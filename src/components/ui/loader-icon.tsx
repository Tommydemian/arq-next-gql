import type * as React from "react";
// import { cn } from "@/lib/utils";

type LoaderIconProps = {
	className?: string;
};

export const LoaderIcon: React.FC<LoaderIconProps> = ({ className }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
	>
		<title>loading spinner</title>
		<circle cx="12" cy="12" r="10" stroke="currentColor" />
		<path
			fill="currentColor"
			d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12zm2 5.291A7.96 7.96 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938z"
		/>
	</svg>
);
