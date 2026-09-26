import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../hooks/useCurrentUser";
import useApplication from "../hooks/useApplication";
import type { ChatPayload } from "@repo/shared-types";
import useChat from "../hooks/useChat";
import { simpleflake } from "simpleflakes";
import ApplicationDetails from "../components/ApplicationDetails";
import JobDetails from "../components/JobDetails";
import SlidingPanel from "../components/SlidingPanel";

export default function Applications() {
	const [status, setStatus] = useState("all");
	const { data: currUserData } = useCurrentUser();
	const { allApplications } = useApplication();
	const { currUserChats } = useChat();
	const navigate = useNavigate();
	const chatId = simpleflake();
	const [selectedApplicationId, setSelectedApplicationId] = useState<
		string | null
	>(null);
	const selectedApplication =
		allApplications?.find(
			application => application.id === selectedApplicationId
		) ?? null;
	const [activePanel, setActivePanel] = useState<"job" | "application" | null>(
		null
	);
	const [isPanelOpen, setIsPanelOpen] = useState(false);
	const closePanel = useCallback(() => setIsPanelOpen(false), []);
	const handlePanelExited = useCallback(() => {
		setSelectedApplicationId(null);
		setActivePanel(null);
	}, []);

	function hasChatWithPoster(jobPosterId: string) {
		const hasChatWithPoster =
			currUserChats?.filter((chat: ChatPayload) =>
				chat.participants.some(
					participant => participant.user.id === jobPosterId
				)
			) ?? [];
		return hasChatWithPoster;
	}

	return (
		<div className="min-h-screen bg-white px-4 py-8 relative">
			{selectedApplication && activePanel && (
				<SlidingPanel
					isOpen={isPanelOpen}
					onClose={closePanel}
					onExited={handlePanelExited}
				>
					{activePanel === "job" ? (
						<JobDetails selectedJob={selectedApplication.job} />
					) : (
						<ApplicationDetails application={selectedApplication} setSelectedApplicationId={setSelectedApplicationId} />
					)}
				</SlidingPanel>
			)}

			<div className="mx-auto w-full max-w-7xl">
				<div className="overflow-hidden rounded-lg border border-slate-300 bg-white shadow-sm">
					{/* Header */}
					<div className="flex flex-col gap-5 border-b border-slate-200 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
						<div>
							<h1 className="text-2xl font-semibold tracking-tight text-slate-900">
								Hi {currUserData?.firstName}!
							</h1>

							<p className="mt-1 text-sm text-slate-500">
								Here&apos;s an overview of your applications.
							</p>
						</div>

						<div className="flex items-center gap-4">
							<div className="text-right">
								<p className="text-xs font-medium uppercase tracking-wide text-slate-500">
									Total Applications
								</p>
								<p className="text-2xl font-semibold text-slate-900">
									{allApplications?.length ?? 0}
								</p>
							</div>

							<div className="h-10 w-px bg-slate-200" />

							<select
								className="cursor-pointer rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm outline-none transition hover:border-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
								value={status}
								onChange={e => setStatus(e.target.value)}
							>
								<option value="all">All Applications</option>
								<option value="pending">Pending</option>
								<option value="accepted">Accepted</option>
								<option value="rejected">Rejected</option>
							</select>
						</div>
					</div>

					{/* Table */}
					<div className="overflow-x-auto">
						<table className="min-w-full">
							<thead className="border-b border-slate-200 bg-slate-50">
								<tr>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
									>
										Name
									</th>

									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
									>
										Email
									</th>

									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
									>
										Job ID
									</th>

									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
									>
										Status
									</th>

									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
									>
										Contact
									</th>

									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
									>
										View Job
									</th>

									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
									>
										Application
									</th>
								</tr>
							</thead>

							{allApplications?.length ? (
								allApplications.map(application => (
									<tbody
										className="divide-y divide-slate-200"
										key={application.id}
									>
										<tr className="transition hover:bg-slate-50">
											<td className="whitespace-nowrap px-6 py-4">
												<p className="text-sm font-semibold text-slate-900">
													{application.applicant.firstName}{" "}
													{application.applicant.lastName}
												</p>
											</td>

											<td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
												{application.applicant.email}
											</td>

											<td className="whitespace-nowrap px-6 py-4">
												<span className="font-mono text-sm text-slate-600">
													#{application.jobId}
												</span>
											</td>

											<td className="whitespace-nowrap px-6 py-4">
												<span
													className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
														application.status === "pending"
															? "border border-amber-200 bg-amber-50 text-amber-700"
															: application.status === "accepted"
																? "border border-green-200 bg-green-50 text-green-700"
																: "border border-red-200 bg-red-50 text-red-700"
													}`}
												>
													{application.status}
												</span>
											</td>
											<td className="whitespace-nowrap px-6 py-4">
												<button
													className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-100 hover:cursor-pointer"
													onClick={() => {
														if (hasChatWithPoster(application.posterId).length)
															navigate(
																`/inbox/c/${hasChatWithPoster(application.posterId)[0].id}`
															);
														else
															navigate(
																`/inbox/c/${chatId}?to=${application.posterId}`
															);
													}}
												>
													Contact
												</button>
											</td>

											<td className="whitespace-nowrap px-6 py-4">
												<button
													className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-100 hover:cursor-pointer"
													onClick={() => {
														setSelectedApplicationId(application.id);
														setActivePanel("job");
														setIsPanelOpen(true);
													}}
												>
													View Job
												</button>
											</td>

											<td className="whitespace-nowrap px-6 py-4">
												<button
													type="button"
													className="rounded-md border border-slate-900 bg-slate-900 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-slate-700 hover:cursor-pointer"
													onClick={() => {
														setSelectedApplicationId(application.id);
														setActivePanel("application");
														setIsPanelOpen(true);
													}}
												>
													View Application
												</button>
											</td>
										</tr>
									</tbody>
								))
							) : (
								<tbody>
									<tr>
										<td
											colSpan={7}
											className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-500"
										>
											No applications found
										</td>
									</tr>
								</tbody>
							)}
						</table>
					</div>

					{/* Footer */}
					<div className="border-t border-slate-200 bg-slate-50 px-6 py-4">
						<p className="text-sm text-slate-500">
							Showing applications matching your selected filter.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
