type DashboardNavLink = {
	id: number;
	label: string;
	href: string;
};

export const dashboardNavLinks: DashboardNavLink[] = [
	{
		id: 1,
		label: "Home",
		href: "/",
	},
	{
		id: 2,
		label: "FAQ",
		href: "/faq",
	},
	{
		id: 3,
		label: "Pricing",
		href: "/pricing",
	},
];
