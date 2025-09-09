import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { Wifi, Bluetooth, Plane } from "lucide-react";
import { motion } from "motion/react";

export const Route = createFileRoute("/designs/components/buttons/toggle")({
	component: RouteComponent,
});

type ToggleSwitchProps = {
	checked: boolean;
	onCheckedChange: (next: boolean) => void;
	disabled?: boolean;
	className?: string;
	ariaLabel?: string;
};

function ToggleSwitch({
	checked,
	onCheckedChange,
	disabled,
	className,
	ariaLabel,
}: ToggleSwitchProps) {
	return (
		<motion.button
			whileTap={{ scale: 0.9 }}
			type="button"
			role="switch"
			aria-checked={checked}
			aria-label={ariaLabel}
			disabled={disabled}
			onClick={() => onCheckedChange(!checked)}
			className={cn(
				"group relative inline-flex cursor-pointer select-none items-center rounded-full p-0.5 transition-all outline-none",
				"focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
				disabled ? "opacity-60 cursor-not-allowed" : "",
				className,
			)}
		>
			<span
				className={cn(
					"h-6 w-10 pointer-events-none block rounded-full border-2 border-slate-500 transition-colors",
					checked ? "bg-pink-400 border-pink-400" : "bg-slate-500/30",
				)}
			/>
			<motion.span
				animate={{
					left: checked ? 22 : 5,
					scale: checked ? 1 : 0.8,
					background: checked ? "white" : "oklch(55.4% 0.046 257.417)",
				}}
				className={cn(
					"size-4 pointer-events-none absolute top-1/2 -translate-y-1/2 rounded-full",
				)}
			/>
		</motion.button>
	);
}

function ShowcaseSection({
	title,
	desc,
	children,
}: {
	title: string;
	desc?: string;
	children: React.ReactNode;
}) {
	return (
		<div className="space-y-3">
			<div>
				<h3 className="text-sm font-semibold tracking-wide">{title}</h3>
				{desc ? (
					<p className="text-xs text-muted-foreground mt-1">{desc}</p>
				) : null}
			</div>
			<div className="rounded-lg border border-input/70 bg-card/40 p-4">
				{children}
			</div>
		</div>
	);
}

function RouteComponent() {
	const [wifi, setWifi] = React.useState(true);
	const [bluetooth, setBluetooth] = React.useState(false);
	const [airplane, setAirplane] = React.useState(false);

	return (
		<div className="flex h-full w-full items-center justify-center">
			<div className="w-full max-w-3xl space-y-8">
				<ShowcaseSection
					title="Control Center"
					desc="Try playing around with them! :)"
				>
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
						<div className="flex flex-col gap-3 rounded-md border border-input/70 bg-card/30 p-3">
							<div className="flex items-center justify-between gap-3">
								<div className="flex items-center gap-2 text-sm font-medium">
									<Wifi className="size-4 text-primary" /> Wi‑Fi
								</div>
								<ToggleSwitch
									checked={wifi}
									onCheckedChange={setWifi}
									ariaLabel="Wi‑Fi"
								/>
							</div>
							<p className="text-xs text-muted-foreground">
								{wifi ? "Connected to wifi" : "Not connected"}
							</p>
						</div>

						<div className="flex flex-col gap-3 rounded-md border border-input/70 bg-card/30 p-3">
							<div className="flex items-center justify-between gap-3">
								<div className="flex items-center gap-2 text-sm font-medium">
									<Bluetooth className="size-4 text-primary" /> Bluetooth
								</div>
								<ToggleSwitch
									checked={bluetooth}
									onCheckedChange={setBluetooth}
									ariaLabel="Bluetooth"
								/>
							</div>
							<p className="text-xs text-muted-foreground">
								{bluetooth ? "Discoverable by others" : "Off"}
							</p>
						</div>

						<div className="flex flex-col gap-3 rounded-md border border-input/70 bg-card/30 p-3">
							<div className="flex items-center justify-between gap-3">
								<div className="flex items-center gap-2 text-sm font-medium">
									<Plane className="size-4 text-primary" /> Airplane
								</div>
								<ToggleSwitch
									checked={airplane}
									onCheckedChange={(next) => {
										setAirplane(next);
										if (next) {
											setWifi(false);
											setBluetooth(false);
										}
									}}
									ariaLabel="Airplane mode"
								/>
							</div>
							<p className="text-xs text-muted-foreground">
								{airplane ? "Wireless features disabled" : "Normal mode"}
							</p>
						</div>
					</div>
				</ShowcaseSection>
			</div>
		</div>
	);
}
