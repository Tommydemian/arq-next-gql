import React, { type FC, type ReactNode } from "react";
import { Navigation } from "../components/dashboard/Navigation";

type LayoutProps = {
	children: ReactNode;
};
const Layout: FC<LayoutProps> = ({ children }) => {
	return (
		<div>
			<Navigation />
			{children}
		</div>
	);
};

export default Layout;
