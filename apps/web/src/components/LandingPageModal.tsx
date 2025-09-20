"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "./ui/alert-dialog";

export default function LandingPageModal() {
	const [open, setOpen] = useState(true);
	return (
		<div>
			<AlertDialog open={open} onOpenChange={setOpen}>
				<AlertDialogContent className="grid justify-self-center rounded-xl bg-secondary p-8 shadow-2xl">
					<AlertDialogHeader className="space-y-6">
						<AlertDialogTitle className="flex items-center justify-center gap-4">
							<div className="relative transform rounded-2xl bg-primary p-3 shadow-[var(--accent)]/30 shadow-lg transition-transform duration-300 hover:scale-105">
								<Image
									alt="pingit-logo"
									src="/pingit_logo.png"
									width={50}
									height={50}
									className="rounded-xl"
								/>
							</div>
							<span className="font-bold text-3xl text-accent">PingIt!</span>
						</AlertDialogTitle>

						<AlertDialogDescription className="my-4 flex items-center justify-center text-center font-medium text-lg">
							<span className="font-semibold">Your voice</span>.
							<span className="font-semibold">Your vibe</span>.
							<span className="font-semibold text-accent">Your Ping!</span>
						</AlertDialogDescription>
					</AlertDialogHeader>

					<AlertDialogFooter className="grid gap-y-4 justify-self-center">
						<AlertDialogAction className="w-full rounded-xl px-6 py-3 font-semibold text-lg shadow-lg transition-all duration-200">
							Create Account
						</AlertDialogAction>

						<AlertDialogCancel className="w-full rounded-xl border px-6 py-3 font-medium text-lg shadow-md transition-all duration-200">
							Explore PingIt
						</AlertDialogCancel>
					</AlertDialogFooter>

					<p className="mt-2 border-t pt-4 text-center text-sm">
						Already have an account?{" "}
						<Link
							href="/login"
							className="font-semibold text-accent underline underline-offset-2 transition-all duration-200"
						>
							Log in
						</Link>
					</p>
				</AlertDialogContent>
			</AlertDialog>

			{open && (
				<div className="fade-in fixed inset-0 z-40 animate-in bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20 backdrop-blur-md duration-300" />
			)}
		</div>
	);
}
