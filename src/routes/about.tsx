import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex h-full w-full items-center">
			<h1 className="text-6xl font-extralight text-slate-600">What is this?</h1>
		</div>
	);
}
