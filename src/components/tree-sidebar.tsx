import { Link } from "@tanstack/react-router";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
} from "./ui/sidebar";
import { HomeIcon, InfoIcon, ToggleLeftIcon } from "lucide-react";
import { Tree, type TreeItem } from "./ui/tree";
import type { PropsWithChildren } from "react";

const DESIGNS: Array<TreeItem> = [
	[
		{ label: "Components" },
		[
			{ label: "Buttons" },
			[
				{
					label: "Toggle",
					url: "/designs/components/buttons/toggle",
					icon: <ToggleLeftIcon />,
				},
			],
		],
	],
];

export function TreeSidebar() {
	return (
		<Sidebar className="border-dashed border-r-slate-500 after:content-[''] after:absolute after:top-0 after:-right-[1px] after:w-1 after:h-full after:bg-gradient-to-t after:from-white after:via-transparent after:to-white after:z-20">
			<SidebarContent className="bg-background">
				<SidebarGroup>
					<SidebarGroupLabel>Navigation</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarUrlButton url="/">
								<HomeIcon />
								Home
							</SidebarUrlButton>
							<SidebarUrlButton url="/about">
								<InfoIcon />
								What is this?
							</SidebarUrlButton>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarGroup>
					<SidebarGroupLabel>Designs</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{DESIGNS.map((item, index) => (
								// biome-ignore lint/suspicious/noArrayIndexKey: key is stable
								<Tree key={index} item={item} />
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}

type SidebarUrlButtonProps = PropsWithChildren<{
	url?: string;
}>;

function SidebarUrlButton(props: SidebarUrlButtonProps) {
	return (
		<SidebarMenuButton className="data-[active=true]:bg-transparent" asChild>
			<Link to={props.url}>{props.children}</Link>
		</SidebarMenuButton>
	);
}
