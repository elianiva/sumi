import { FileIcon, FolderClosedIcon, FolderOpenIcon } from "lucide-react";
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
				<Link to={treeItem.url ?? ""}>
					{treeItem.icon ?? <FileIcon />}
					{treeItem.label}
				</Link>
			</SidebarMenuButton>
		);
	}

	return (
		<SidebarMenuItem>
			<Collapsible
				className="group/collapsible [&[data-state=open]>button>#folder-open]:block [&[data-state=closed]>button>#folder-closed]:block"
				defaultOpen
			>
				<CollapsibleTrigger asChild>
					<SidebarMenuButton>
						<FolderOpenIcon id="folder-open" className="hidden" />
						<FolderClosedIcon id="folder-closed" className="hidden" />
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
