import { useState } from "react";
import { useCurrentUser } from "../hooks/useCurrentUser";
import useUser from "../hooks/useUser";
import ProfileContent from "../components/profile/ProfileContent";
import Resume from "../components/profile/Resume";

const EXPERIENCE_MAP: Record<string, { label: string; score: number }> = {
	"Just getting started": { label: "Entry Level", score: 1 },
	"Learning and building projects": { label: "Junior", score: 2 },
	"I've completed a few projects": { label: "Intermediate", score: 3 },
	"I've done freelance or professional work": { label: "Proficient", score: 4 },
	"Experienced developer": { label: "Senior", score: 5 }
};

export default function Profile() {
	const { data: currUserData } = useCurrentUser();
	const { userProfileData } = useUser();
	const [workerTab, setWorkerTab] = useState<"history" | "payments">("history");
	const onboardingAnswers = userProfileData?.onboarding_answers;
	const technologies = onboardingAnswers?.technologies ?? [];
	const projectTypes =
		onboardingAnswers?.seekingProjects ?? onboardingAnswers?.interests ?? [];
	const hiringNeeds = onboardingAnswers?.hiringFor ?? [];
	const isWorker = onboardingAnswers?.role === "Work";
	const role = isWorker ? "Freelance developer" : "Hiring professional";

	const experienceInfo = onboardingAnswers?.experience
		? (EXPERIENCE_MAP[onboardingAnswers.experience] ?? {
				label: onboardingAnswers.experience,
				score: 3
			})
		: { label: "Growing", score: 1 };

	const [showResume, setShowResume] = useState(false);

	return (
		<div className="min-h-screen w-full bg-slate-100/50 px-4 py-6 sm:px-6">
			<div className="mx-auto grid w-full max-w-6xl gap-5 lg:grid-cols-[280px_1fr]">
				<aside className="h-fit rounded-md border border-slate-300 bg-white p-6 shadow-sm lg:min-h-[calc(100vh-3rem)]">
					<div className="flex flex-col items-center text-center">
						<img
							src={userProfileData?.profile_picture}
							alt="Profile"
							className="h-32 w-32 rounded-full border border-slate-200 object-cover"
							referrerPolicy="no-referrer"
						/>

						<h1 className="mt-5 text-2xl font-semibold tracking-tight text-slate-950">
							{userProfileData?.first_name} {userProfileData?.last_name}
						</h1>

						<p className="mt-1 text-sm font-medium text-slate-500">{role}</p>

						<div className="mt-5 flex items-center gap-2 text-sm text-emerald-700">
							<span className="absolute h-2 w-2 rounded-full bg-emerald-500" />
							<span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
							Available for projects
						</div>
					</div>

					<div className="mt-8 border-t border-slate-200 pt-6">
						<p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
							Profile snapshot
						</p>

						<dl className="mt-4 space-y-4 text-sm">
							{isWorker ? (
								<>
									<div className="space-y-1.5">
										<div className="flex justify-between gap-3">
											<dt className="text-slate-500">Experience</dt>
											<dd className="text-right font-medium text-slate-800">
												{experienceInfo.label}
											</dd>
										</div>
										<div
											className="flex gap-1"
											title={`${experienceInfo.label} (${experienceInfo.score}/5)`}
										>
											{[1, 2, 3, 4, 5].map(step => (
												<div
													key={step}
													className={`h-1.5 flex-1 rounded-full ${
														step <= experienceInfo.score
															? "bg-emerald-600"
															: "bg-slate-200"
													}`}
												/>
											))}
										</div>
									</div>

									<div className="flex justify-between gap-3">
										<dt className="text-slate-500">Response time</dt>
										<dd className="text-right font-medium text-slate-800">
											{onboardingAnswers?.responseTime ?? "Within 24 hours"}
										</dd>
									</div>

									<div className="flex justify-between gap-3">
										<dt className="text-slate-500">Primary goal</dt>
										<dd className="text-right font-medium text-slate-800">
											{onboardingAnswers?.hopes?.[0] ?? "Portfolio & clients"}
										</dd>
									</div>

									<div className="flex justify-between gap-3">
										<dt className="text-slate-500">Location</dt>
										<dd className="text-right font-medium text-slate-800">
											{userProfileData?.location ?? "Not specified"}
										</dd>
									</div>

									<div className="flex justify-between gap-3">
										<dt className="text-slate-500">Resume</dt>
										<dd className="text-right font-medium text-slate-800">
											{userProfileData?.resume_id ? (
												<span className="inline-flex items-center text-emerald-700">
													Attached
												</span>
											) : (
												<span className="text-slate-400">Not uploaded</span>
											)}
										</dd>
									</div>
								</>
							) : (
								<>
									<div className="flex justify-between gap-3">
										<dt className="text-slate-500">Location</dt>
										<dd className="text-right font-medium text-slate-800">
											{userProfileData?.location ?? "Not specified"}
										</dd>
									</div>
									<div className="flex justify-between gap-3">
										<dt className="text-slate-500">Budget</dt>
										<dd className="text-right font-medium text-slate-800">
											{onboardingAnswers?.budget ?? "Not specified"}
										</dd>
									</div>
								</>
							)}

							<div className="flex justify-between gap-3">
								<dt className="text-slate-500">Member since</dt>
								<dd className="text-right font-medium text-slate-800">
									{currUserData?.createdAt
										? new Date(currUserData.createdAt).toLocaleDateString()
										: "Recently"}
								</dd>
							</div>
						</dl>
					</div>
				</aside>
				{!showResume ? (
					<ProfileContent
						isWorker={isWorker}
						onboardingAnswers={onboardingAnswers}
						projectTypes={projectTypes}
						hiringNeeds={hiringNeeds}
						technologies={technologies}
						workerTab={workerTab}
						setWorkerTab={setWorkerTab}
						setShowResume={setShowResume}
					/>
				) : (
					<Resume setShowResume={setShowResume} />
				)}
			</div>
		</div>
	);
}
