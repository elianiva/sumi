import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
	createFileRoute,
	Link,
	Outlet,
	useLocation,
} from "@tanstack/react-router";

export const Route = createFileRoute("/designs")({
	component: RouteComponent,
});

function RouteComponent() {
	const location = useLocation();
	const paths = location.pathname.split("/").slice(1);

	return (
		<div className="h-full w-full">
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink asChild className="capitalize">
							<Link to="/">Home</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					{paths.map((path, index) => (
						<>
							{index !== paths.length - 1 ? (
								<BreadcrumbItem key={path}>
									<BreadcrumbLink asChild className="capitalize">
										<Link to={`/${path}`}>{path}</Link>
									</BreadcrumbLink>
								</BreadcrumbItem>
							) : (
								<BreadcrumbItem key={path}>
									<BreadcrumbPage className="capitalize">
										{path.replaceAll("-", " ")}
									</BreadcrumbPage>
								</BreadcrumbItem>
							)}
							{index !== paths.length - 1 && (
								<BreadcrumbSeparator key={`${path}-separator`} />
							)}
						</>
					))}
				</BreadcrumbList>
			</Breadcrumb>
			<div className="h-full flex items-center justify-center">
				<Outlet />
			</div>
		</div>
	);
}
