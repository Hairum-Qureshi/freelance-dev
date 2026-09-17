import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import useUser from "../../hooks/useUser";
import { useRef } from "react";
import type { OnboardingAnswers } from "@repo/shared-types";
import { Tailspin } from "ldrs/react";
import "ldrs/react/Tailspin.css";
import { simpleflake } from "simpleflakes";

export default function ProfileContent({
	isWorker,
	onboardingAnswers,
	projectTypes,
	hiringNeeds,
	technologies,
	workerTab,
	setWorkerTab,
	setShowResume
}: {
	isWorker: boolean;
	onboardingAnswers: OnboardingAnswers;
	projectTypes: string[];
	hiringNeeds: string[];
	technologies: string[];
	workerTab: "history" | "payments";
	setWorkerTab: (tab: "history" | "payments") => void;
	setShowResume: (show: boolean) => void;
}) {
	const { data: currUserData } = useCurrentUser();
	const navigate = useNavigate();
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const { attachResumeMutation, userProfileData, isAddingResume } = useUser();

	const chatId = simpleflake();

	return (
		<main className="rounded-md border border-slate-300 bg-white p-5 shadow-sm sm:p-8">
			<div className="flex flex-col gap-5 border-b border-slate-200 pb-7 sm:flex-row sm:items-start sm:justify-between">
				<div>
					<h2 className="mt-1 text-3xl font-semibold tracking-tight text-slate-950">
						{isWorker
							? "Let's build something useful."
							: "Looking for the right collaborator."}
					</h2>

					<p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
						{isWorker
							? "I help teams turn ideas into polished digital products, from the first wireframe to a reliable launch."
							: "I am seeking a reliable freelancer for an upcoming project."}
					</p>
				</div>

				<div className="flex shrink-0 gap-2">
					{userProfileData?.id === currUserData?.id && (
						<button
							type="button"
							className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:cursor-pointer hover:bg-slate-50"
							onClick={() => navigate(`settings`)}
						>
							Edit profile
						</button>
					)}

					{userProfileData?.resume_id ? (
						<button
							type="button"
							className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:cursor-pointer hover:bg-slate-50"
							onClick={() => {
								setShowResume(true);
							}}
						>
							View resume
						</button>
					) : (
						<>
							<input
								ref={fileInputRef}
								type="file"
								accept=".pdf,application/pdf"
								className="hidden"
								onChange={e => {
									if (e.target.files && e.target.files[0]) {
										attachResumeMutation.mutate({ file: e.target.files[0] });
									}
								}}
							/>
							{currUserData?.id === userProfileData?.id &&
								(isAddingResume ? (
									<div className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:cursor-not-allowed hover:bg-slate-50 flex items-center gap-2">
										<Tailspin size="20" stroke="3" speed="0.9" color="black" />
										<span>Uploading...</span>
									</div>
								) : (
									<button
										type="button"
										className={`${isAddingResume ? "hidden" : "rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:cursor-pointer hover:bg-slate-50"}`}
										onClick={() => {
											fileInputRef.current?.click();
											if (fileInputRef.current) {
												fileInputRef.current.value = "";
											}
										}}
									>
										Add resume
									</button>
								))}
						</>
					)}

					{userProfileData?.id !== currUserData?.id && (
						<button
							type="button"
							className="rounded-md bg-slate-950 px-4 py-2 text-sm font-medium text-white hover:cursor-pointer hover:bg-slate-800"
							onClick={() => navigate(`/inbox/c/${chatId}?to=${userProfileData?.id}`)}
						>
							Contact
						</button>
					)}
				</div>
			</div>

			<section className="grid gap-4 py-7 sm:grid-cols-3">
				<div className="rounded-md bg-slate-50 p-4">
					<p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
						{isWorker ? "Focus" : "Pay scale"}
					</p>

					<p className="mt-2 font-medium text-slate-900">
						{isWorker
							? "Thoughtful digital products"
							: (onboardingAnswers?.budget ?? "Not specified")}
					</p>
				</div>

				<div className="rounded-md bg-slate-50 p-4">
					<p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
						Response time
					</p>

					<p className="mt-2 font-medium text-slate-900">
						{onboardingAnswers?.responseTime ?? "Not specified"}
					</p>
				</div>

				<div className="rounded-md bg-slate-50 p-4">
					<p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
						{isWorker ? "Work style" : "Project status"}
					</p>

					<p className="mt-2 font-medium text-slate-900">
						{isWorker ? "Collaborative and clear" : "Seeking a freelancer"}
					</p>
				</div>
			</section>

			<section className="border-t border-slate-200 py-7">
				<h2 className="text-xl font-semibold text-slate-950">
					{isWorker ? "Services and interests" : "Hiring needs"}
				</h2>

				<p className="mt-1 text-sm text-slate-500">
					{isWorker
						? "The kind of work this freelancer is ready to take on."
						: "The work this client is looking to commission."}
				</p>

				<div className="mt-4 flex flex-wrap gap-2">
					{(isWorker ? projectTypes : hiringNeeds).length > 0 ? (
						(isWorker ? projectTypes : hiringNeeds).map((project: string) => (
							<span
								key={project}
								className="rounded-full border border-slate-200 px-3 py-1.5 text-sm text-slate-700"
							>
								{project}
							</span>
						))
					) : (
						<span className="text-sm text-slate-500">
							{isWorker
								? "Projects and services will appear here as this profile grows."
								: "Project requirements will appear here as this profile grows."}
						</span>
					)}
				</div>
			</section>

			{isWorker && (
				<section className="border-t border-slate-200 py-7">
					<h2 className="text-xl font-semibold text-slate-950">
						Skills and tools
					</h2>

					<div className="mt-4 flex flex-wrap gap-2">
						{technologies.length > 0 ? (
							technologies.map((technology: string) => (
								<span
									key={technology}
									className="rounded-full bg-slate-950 px-3 py-1.5 text-sm text-white"
								>
									{technology}
								</span>
							))
						) : (
							<span className="text-sm text-slate-500">
								Add technologies to show your toolkit here.
							</span>
						)}
					</div>
				</section>
			)}

			{isWorker && (
				<section className="border-t border-slate-200 py-7">
					<div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
						<div>
							<h2 className="text-xl font-semibold text-slate-950">
								Work activity
							</h2>

							<p className="mt-1 text-sm text-slate-500">
								Your completed projects and payment history.
							</p>
						</div>

						<div
							className="flex w-full border-b border-slate-200 sm:w-auto"
							role="tablist"
							aria-label="Work activity"
						>
							<button
								type="button"
								role="tab"
								aria-selected={workerTab === "history"}
								className={`px-3 py-2 text-sm font-medium ${
									workerTab === "history"
										? "border-b-2 border-slate-950 text-slate-950"
										: "text-slate-500 hover:cursor-pointer hover:text-slate-800"
								}`}
								onClick={() => setWorkerTab("history")}
							>
								Work history
							</button>

							<button
								type="button"
								role="tab"
								aria-selected={workerTab === "payments"}
								className={`px-3 py-2 text-sm font-medium ${
									workerTab === "payments"
										? "border-b-2 border-slate-950 text-slate-950"
										: "text-slate-500 hover:cursor-pointer hover:text-slate-800"
								}`}
								onClick={() => setWorkerTab("payments")}
							>
								Payments
							</button>
						</div>
					</div>

					<div className="mt-5 rounded-md border border-dashed border-slate-300 px-5 py-8 text-center">
						{workerTab === "history" ? (
							<>
								<p className="font-medium text-slate-700">No past work yet</p>

								<p className="mt-1 text-sm text-slate-500">
									Completed projects will appear here.
								</p>
							</>
						) : (
							<>
								<p className="font-medium text-slate-700">No payments yet</p>

								<p className="mt-1 text-sm text-slate-500">
									Payments from completed projects will appear here.
								</p>
							</>
						)}
					</div>
				</section>
			)}

			{isWorker && (
				<section className="border-t border-slate-200 pt-7">
					<div className="flex items-end justify-between gap-4">
						<div>
							<h2 className="text-xl font-semibold text-slate-950">
								Client reviews
							</h2>

							<p className="mt-1 text-sm text-slate-500">
								Build trust with feedback from every project.
							</p>
						</div>

						<span className="text-sm text-slate-400">0 reviews</span>
					</div>

					<div className="mt-5 rounded-md border border-dashed border-slate-300 px-5 py-8 text-center">
						<p className="font-medium text-slate-700">No reviews yet</p>

						<p className="mt-1 text-sm text-slate-500">
							Completed projects will make this space yours.
						</p>
					</div>
				</section>
			)}
		</main>
	);
}
