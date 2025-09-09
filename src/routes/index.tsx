import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	return (
		<div className="w-full h-full flex flex-col justify-center">
			<h1 className="text-8xl font-extralight text-slate-700 mb-4">SUMI</h1>
			<p className="text-xl text-slate-500 font-light">
				A design experimentation playground
			</p>
		</div>
	);
}
