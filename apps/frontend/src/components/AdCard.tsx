import type { ChatPayload, JobPayload } from "@repo/shared-types";
import { useLocation, useNavigate } from "react-router-dom";
import { simpleflake } from "simpleflakes";
import useChat from "../hooks/useChat";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import ApplicationModal from "./ApplicationModal";

export default function AdCard({ job }: { job: JobPayload }) {
	const postedDate = new Date(job.createdAt).toLocaleDateString();
	const chatId = simpleflake();
	const navigate = useNavigate();
	const { currUserChats } = useChat();
	const { data: currUserData } = useCurrentUser();
	const location = useLocation();
	const [showModal, setShowModal] = useState(false);

	const hasChatWithPoster =
		currUserChats?.filter((chat: ChatPayload) =>
			chat.participants.some(
				participant => participant.user.id === job.posterId
			)
		) ?? [];

	return (
		<div className="rounded-xl border border-gray-200 bg-white p-6 transition hover:border-gray-400">
			{showModal && <ApplicationModal setShowModal={setShowModal} />}
			<div className="flex items-start justify-between gap-6">
				<div className="min-w-0">
					<h2 className="text-lg font-semibold text-black">{job.jobTitle}</h2>

					<p className="mt-1 text-sm text-gray-600">{job.businessName}</p>

					<p className="mt-1 text-sm text-gray-500">
						Posted {postedDate} · {job.workLocation}
					</p>
				</div>

				<div className="shrink-0 text-right">
					<p className="font-semibold text-green-700/90">
						${job.salaryMin.toLocaleString()} - $
						{job.salaryMax.toLocaleString()}
					</p>

					<p className="mt-1 text-xs text-gray-500">{job.paymentType}</p>
				</div>
			</div>

			{/* Job Metadata */}
			<div className="mt-4 flex flex-wrap gap-2">
				<span className="rounded-md bg-black px-3 py-1 text-xs font-medium text-white">
					{job.projectType}
				</span>

				<span className="rounded-md border border-gray-300 px-3 py-1 text-xs text-gray-700">
					{job.experienceLevel}
				</span>

				<span className="rounded-md border border-gray-300 px-3 py-1 text-xs text-gray-700">
					{job.jobType}
				</span>

				<span className="rounded-md border border-gray-300 px-3 py-1 text-xs text-gray-700">
					{job.workLocation}
				</span>

				<span className="rounded-md border border-gray-300 px-3 py-1 text-xs text-gray-700">
					{job.region}
				</span>
			</div>

			{/* Project Details */}
			<div className="mt-5">
				<h3 className="text-sm font-semibold text-black">Project Details</h3>

				<p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">
					{job.projectDetails}
				</p>
			</div>

			{/* Looking For */}
			<div className="mt-5">
				<h3 className="text-sm font-semibold text-black">Looking For</h3>

				<p className="mt-2 text-sm leading-6 text-gray-600">{job.lookingFor}</p>
			</div>

			{/* Deliverables */}
			<div className="mt-5">
				<h3 className="text-sm font-semibold text-black">Deliverables</h3>

				<p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-600">
					{job.deliverables}
				</p>
			</div>

			{/* Timeline & Location */}
			<div className="mt-5 grid grid-cols-2 gap-4 border-y border-gray-100 py-4">
				<div>
					<p className="text-xs font-medium uppercase tracking-wide text-gray-400">
						Timeline
					</p>

					<p className="mt-1 text-sm text-gray-700">{job.timeline}</p>
				</div>

				<div>
					<p className="text-xs font-medium uppercase tracking-wide text-gray-400">
						Region
					</p>

					<p className="mt-1 text-sm text-gray-700">{job.region}</p>
				</div>
			</div>

			{/* Skills */}
			<div className="mt-5">
				<h3 className="text-sm font-semibold text-black">Skills</h3>

				<div className="mt-2 flex flex-wrap gap-2">
					{job.skills.map(skill => (
						<span
							key={skill}
							className="rounded-md border border-gray-300 px-3 py-1 text-xs text-gray-700"
						>
							{skill}
						</span>
					))}
				</div>
			</div>

			{/* Contact Section */}
			{currUserData?.id !== job.posterId && (
				<div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
					<div className="flex items-start justify-between gap-4">
						<div>
							<h3 className="text-sm font-semibold text-black">
								Have questions about this project?
							</h3>

							<p className="mt-1 text-sm leading-5 text-gray-600">
								Contact {job.poster.firstName} for more details about the
								project, requirements, timeline, or anything else you'd like to
								know before getting started.
							</p>
						</div>

						<button
							className="shrink-0 rounded-lg border border-black bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 active:scale-[0.98] hover:cursor-pointer"
							onClick={() =>
								hasChatWithPoster.length
									? navigate(`/inbox/c/${hasChatWithPoster[0].id}`)
									: navigate(`/inbox/c/${chatId}?to=${job.posterId}`)
							}
						>
							Contact
						</button>
					</div>
				</div>
			)}

			{/* Poster */}
			<div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
				<div className="flex items-center gap-3">
					{job.poster.profilePicture ? (
						<img
							src={job.poster.profilePicture}
							alt={`${job.poster.firstName} ${job.poster.lastName}`}
							className="h-9 w-9 rounded-full object-cover"
						/>
					) : (
						<div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-sm font-medium text-gray-700">
							{job.poster.firstName.charAt(0)}
							{job.poster.lastName.charAt(0)}
						</div>
					)}

					<div>
						<p className="text-sm font-medium text-black">
							{job.poster.firstName} {job.poster.lastName}
						</p>

						<p className="text-xs text-gray-500">{job.poster.email}</p>
					</div>
				</div>

				<div className="flex flex-wrap justify-end gap-2">
					{/* View Posting */}
					{!location.pathname.split("/").includes("listing") && (
						<button
							className="whitespace-nowrap rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition-all hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 active:scale-[0.98] hover:cursor-pointer"
							onClick={() => navigate(`/listing/${job.id}`)}
						>
							View Posting
						</button>
					)}

					{currUserData?.id === job.posterId && (
						<div className="mx-2 flex space-x-2">
							{/* Edit Posting */}
							<button
								aria-label="Edit posting"
								className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white text-xl text-gray-700 transition-colors hover:border-gray-400 hover:bg-gray-50 hover:text-black focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 active:scale-95 hover:cursor-pointer"
							>
								<FaRegEdit />
							</button>

							{/* Delete Posting */}
							<button
								aria-label="Delete posting"
								className="flex h-10 w-10 items-center justify-center rounded-lg border border-red-200 bg-white text-xl text-red-600 transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 active:scale-95 hover:cursor-pointer"
							>
								<MdDelete />
							</button>

							{/* View Applicants */}
							<button
								className="whitespace-nowrap rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-800 transition-colors hover:border-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 active:scale-[0.98] hover:cursor-pointer"
								onClick={() => navigate(`/applicants/${job.id}/all`)}
							>
								View Applicants
							</button>
						</div>
					)}

					{currUserData?.role === "freelancer" &&
						currUserData?.id !== job.posterId && (
							/* Apply */
							<button
								className="whitespace-nowrap rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition-all hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 active:scale-[0.98]"
								onClick={() => setShowModal(true)}
							>
								Apply
							</button>
						)}
				</div>
			</div>
		</div>
	);
}
