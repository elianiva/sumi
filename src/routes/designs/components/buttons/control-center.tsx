import { cn } from "@/lib/utils";
import { createFileRoute } from "@tanstack/react-router";
import {
	Wifi,
	Bluetooth,
	WifiOff,
	BluetoothOff,
	type LucideIcon,
	Navigation,
	NavigationOff,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export const Route = createFileRoute(
	"/designs/components/buttons/control-center",
)({
	component: RouteComponent,
});

type ToggleSwitchProps = {
	checked: boolean;
	onCheckedChange: (next: boolean) => void;
	disabled?: boolean;
	className?: string;
	icon: {
		active: LucideIcon;
		inactive: LucideIcon;
	};
	label: string;
};

function ToggleSwitch({
	checked,
	onCheckedChange,
	disabled,
	icon,
	label,
}: ToggleSwitchProps) {
	return (
		<motion.button
			whileTap={{
				scale: 0.95,
			}}
			type="button"
			role="switch"
			aria-checked={checked}
			aria-label={label}
			disabled={disabled}
			onClick={() => onCheckedChange(!checked)}
			className={cn(
				"relative z-10 cursor-pointer disabled:cursor-not-allowed rounded-[1rem] p-px drop-shadow-md bg-gradient-to-t",
				"after:content-[''] after:absolute after:inset-px after:rounded-[calc(1rem-1px)] after:bg-gradient-to-t after:from-white/10 after:via-white/70 after:to-white/10 after:opacity-25",
				{
					"from-neutral-100 to-white drop-shadow-neutral-200/20": !checked,
					"from-pink-300 to-pink-50 drop-shadow-pink-200/40": checked,
				},
			)}
		>
			<div
				className={cn(
					"shadow-inner h-full w-full py-6 px-4 rounded-[calc(1rem-1px)] flex items-center gap-2 text-xs bg-gradient-to-t from-white to-neutral-100 ",
					"before:content-[''] before:absolute before:inset-px before:shadow-inner before:rounded-[calc(1rem-1px)] before:bg-gradient-to-t before:from-pink-300/50 before:to-pink-400 before:transition-opacity",
					{
						"text-neutral-500 before:opacity-0": !checked,
						"text-white before:opacity-100": checked,
					},
				)}
			>
				<div className="relative size-4">
					<motion.div
						className="absolute left-0 top-0"
						animate={{
							y: checked ? 0 : 4,
							opacity: checked ? 1 : 0,
						}}
					>
						<icon.active
							className={cn("size-4 text-primary transition-colors", {
								"text-neutral-500": !checked,
								"text-white": checked,
							})}
						/>
					</motion.div>
					<motion.div
						className="absolute left-0 top-0"
						animate={{
							y: checked ? -4 : 0,
							opacity: checked ? 0 : 1,
						}}
					>
						<icon.inactive
							className={cn("size-4 text-primary transition-colors", {
								"text-neutral-500": !checked,
								"text-white": checked,
							})}
						/>
					</motion.div>
				</div>
				<span className="relative leading-none transition-colors">{label}</span>
			</div>
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
			<div className="rounded-3xl border border-input/70 p-4">{children}</div>
		</div>
	);
}

function RouteComponent() {
	const [wifi, setWifi] = useState(true);
	const [bluetooth, setBluetooth] = useState(false);
	const [airplane, setAirplane] = useState(false);

	return (
		<div className="flex h-full w-full items-center justify-center">
			<div className="w-full max-w-xl space-y-8">
				<ShowcaseSection
					title="Control Center"
					desc="Try playing around with them! :)"
				>
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
						<ToggleSwitch
							icon={{
								active: Wifi,
								inactive: WifiOff,
							}}
							checked={wifi}
							onCheckedChange={setWifi}
							disabled={airplane}
							label="Wi‑Fi"
						/>
						<ToggleSwitch
							icon={{
								active: Bluetooth,
								inactive: BluetoothOff,
							}}
							checked={bluetooth}
							onCheckedChange={setBluetooth}
							disabled={airplane}
							label="Bluetooth"
						/>
						<ToggleSwitch
							icon={{
								active: Navigation,
								inactive: NavigationOff,
							}}
							checked={airplane}
							onCheckedChange={(next) => {
								setAirplane(next);
								if (next) {
									setWifi(false);
									setBluetooth(false);
								}
							}}
							label="Airplane mode"
						/>
					</div>
				</ShowcaseSection>
			</div>
		</div>
	);
}
