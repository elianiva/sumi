import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TreeSidebar } from "@/components/tree-sidebar";
import monaspaceNeonFont from "@fontsource/monaspace-neon/index.css?url";
import monaspaceNeonFontLight from "@fontsource/monaspace-neon/latin-300?url";
import monaspaceNeonFontBold from "@fontsource/monaspace-neon/latin-600?url";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "Sumi",
			},
		],
		links: [
			{ rel: "stylesheet", href: appCss },
			{ rel: "stylesheet", href: monaspaceNeonFont },
			{ rel: "stylesheet", href: monaspaceNeonFontLight },
			{ rel: "stylesheet", href: monaspaceNeonFontBold },
		],
	}),

	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="h-full">
			<head>
				<HeadContent />
			</head>
			<body className="h-full">
				<SidebarProvider>
					<TreeSidebar />
					<SidebarInset>
						<main className="w-full h-full p-6">{children}</main>
					</SidebarInset>
				</SidebarProvider>
				<Scripts />
			</body>
		</html>
	);
}
