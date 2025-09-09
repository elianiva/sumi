import { ChevronRightIcon, FileIcon, FolderIcon } from "lucide-react";
import { SidebarMenuButton, SidebarMenuItem, SidebarMenuSub } from "./sidebar";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "./collapsible";
import { Link, useRouter } from "@tanstack/react-router";
import type { ReactNode } from "react";

export type ValueOrArray<TValue> = TValue | IValueOrArray<TValue>;
interface IValueOrArray<TValue> extends Array<ValueOrArray<TValue>> {}
type TreeItemData = {
	label: string;
	icon?: ReactNode;
	url?: string;
};
export type TreeItem = ValueOrArray<TreeItemData>;

type TreeProps = {
	item: TreeItem;
};

export function Tree({ item }: TreeProps) {
	const router = useRouter();
	const [name, ...items] = Array.isArray(item) ? item : [item];
	const treeItem = name as TreeItemData;

	if (!items.length) {
		return (
			<SidebarMenuButton
				isActive={!!router.matchRoute(treeItem.url ?? "")}
				className="data-[active=true]:bg-transparent"
				asChild
			>
				{/* @ts-expect-error: we can't infer dynamic route path */}
				<Link to={`/designs/${treeItem.url ?? ""}`}>
					{treeItem.icon ?? <FileIcon />}
					{treeItem.label}
				</Link>
			</SidebarMenuButton>
		);
	}

	return (
		<SidebarMenuItem>
			<Collapsible
				className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
				defaultOpen
			>
				<CollapsibleTrigger asChild>
					<SidebarMenuButton>
						<ChevronRightIcon className="transition-transform" />
						{treeItem.icon ?? <FolderIcon />}
						{treeItem.label}
					</SidebarMenuButton>
				</CollapsibleTrigger>
				<CollapsibleContent>
					<SidebarMenuSub className="border-dashed border-slate-500">
						{items.map((subItem, index) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: key is stable
							<Tree key={index} item={subItem} />
						))}
					</SidebarMenuSub>
				</CollapsibleContent>
			</Collapsible>
		</SidebarMenuItem>
	);
}
