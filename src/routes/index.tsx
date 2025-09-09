import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-background">
			<h1 className="text-8xl font-extralight text-slate-700 mb-4">SUMI</h1>
			<p className="text-xl text-slate-500 font-light">
				A design experimentation playground
			</p>
		</div>
	);
}
