import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/designs/components/buttons/toggle")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex h-full w-full items-center justify-center">
			Toggle Component
		</div>
	);
}
