"use client";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";

import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { User2, ChevronUp, Home, Settings, Users, LogOut } from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
	{ label: "Dashboard", href: "/dashboard", icon: Home },
	{ label: "Users", href: "/users", icon: Users },
	{ label: "Settings", href: "/settings", icon: Settings },
];

export function AppSidebar() {
	const pathname = usePathname();

	return (
		<Sidebar>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Application</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{navLinks.map((item) => (
								<SidebarMenuItem key={item.label}>
									<SidebarMenuButton asChild>
										<a href={item.href}>
											<item.icon />
											<span>{item.label}</span>
										</a>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
