import type { JobPayload } from "@repo/shared-types";
import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { LuPanelRightClose } from "react-icons/lu";

export default function JobDetailsSidePanel({
	selectedJob,
    setSelectedJob,
	setShowJobPanel,
    showJobPanel,
}: {
	selectedJob: JobPayload;
    setSelectedJob: (job: JobPayload | null) => void;
	setShowJobPanel: (show: boolean) => void;
    showJobPanel: boolean;
}) {
	const [hasEntered, setHasEntered] = useState(false);

	useEffect(() => {
		const frame = requestAnimationFrame(() => setHasEntered(true));
		return () => cancelAnimationFrame(frame);
	}, []);

	const postedDate = new Date(selectedJob.createdAt).toLocaleDateString();

	return (
		<div
			aria-hidden={!showJobPanel}
			className={`absolute top-0 right-0 h-full w-1/3 border-2 border-slate-200 bg-white transition-transform duration-300 ease-in-out motion-reduce:transition-none ${showJobPanel && hasEntered ? "translate-x-0" : "translate-x-full"} ${showJobPanel ? "pointer-events-auto" : "pointer-events-none"}`}
			onTransitionEnd={event => {
				if (event.propertyName === "transform" && !showJobPanel) {
					setSelectedJob(null);
				}
			}}
		>
			<div className="h-full overflow-y-auto px-6 py-5">
				<div>
					{/* Header */}
					<div className="flex items-start justify-between gap-3 border-b border-gray-100 pb-4">
						<div className="min-w-0">
							<h2 className="truncate text-lg font-semibold text-black">
								{selectedJob.jobTitle}
							</h2>

							<p className="mt-1 truncate text-sm text-gray-600">
								{selectedJob.businessName}
							</p>

							<p className="mt-1 text-xs text-gray-400">
								Posted {postedDate}
							</p>
						</div>

						<div className="flex shrink-0 gap-1.5">
							<button
								aria-label="Close panel"
								onClick={() => setShowJobPanel(false)}
								className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 bg-white text-base text-gray-700 transition-colors hover:border-gray-400 hover:cursor-pointer hover:bg-gray-50 hover:text-black"
							>
								<LuPanelRightClose />
							</button>
							<button
								aria-label="Edit posting"
								className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 bg-white text-base text-gray-700 transition-colors hover:border-gray-400 hover:bg-gray-50 hover:cursor-pointer hover:text-black"
							>
								<FaRegEdit />
							</button>

							<button
								aria-label="Delete posting"
								className="flex h-8 w-8 items-center justify-center rounded-md border border-red-200 bg-white text-base text-red-600 transition-colors hover:border-red-300 hover:cursor-pointer hover:bg-red-50 hover:text-red-700"
							>
								<MdDelete />
							</button>
						</div>
					</div>

					{/* Compensation */}
					<div className="border-b border-gray-100 py-4">
						<div className="flex items-center justify-between gap-3">
							<div>
								<p className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
									Compensation
								</p>

								<p className="mt-1 text-base font-semibold text-green-700/90">
									${selectedJob.salaryMin.toLocaleString()} - $
									{selectedJob.salaryMax.toLocaleString()}
								</p>
							</div>

							<span className="rounded-md border border-gray-300 px-2 py-1 text-[11px] text-gray-600">
								{selectedJob.paymentType}
							</span>
						</div>
					</div>

					{/* Job Metadata */}
					<div className="border-b border-gray-100 py-4">
						<h3 className="text-xs font-semibold uppercase tracking-wide text-gray-400">
							Job Details
						</h3>

						<div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3">
							<div>
								<p className="text-[11px] text-gray-400">Project Type</p>
								<p className="mt-0.5 text-xs text-gray-800">
									{selectedJob.projectType}
								</p>
							</div>

							<div>
								<p className="text-[11px] text-gray-400">Job Type</p>
								<p className="mt-0.5 text-xs text-gray-800">
									{selectedJob.jobType}
								</p>
							</div>

							<div>
								<p className="text-[11px] text-gray-400">Experience</p>
								<p className="mt-0.5 text-xs text-gray-800">
									{selectedJob.experienceLevel}
								</p>
							</div>

							<div>
								<p className="text-[11px] text-gray-400">Timeline</p>
								<p className="mt-0.5 text-xs text-gray-800">
									{selectedJob.timeline}
								</p>
							</div>

							<div>
								<p className="text-[11px] text-gray-400">Work Location</p>
								<p className="mt-0.5 text-xs text-gray-800">
									{selectedJob.workLocation}
								</p>
							</div>

							<div>
								<p className="text-[11px] text-gray-400">Region</p>
								<p className="mt-0.5 text-xs text-gray-800">
									{selectedJob.region}
								</p>
							</div>
						</div>
					</div>

					{/* Project Details */}
					<div className="border-b border-gray-100 py-4">
						<h3 className="text-sm font-semibold text-black">
							Project Details
						</h3>

						<p className="mt-2 whitespace-pre-wrap text-xs leading-5 text-gray-600 wrap-break-word">
							{selectedJob.projectDetails}
						</p>
					</div>

					{/* Looking For */}
					<div className="border-b border-gray-100 py-4">
						<h3 className="text-sm font-semibold text-black">
							Looking For
						</h3>

						<p className="mt-2 whitespace-pre-wrap text-xs leading-5 text-gray-600">
							{selectedJob.lookingFor}
						</p>
					</div>

					{/* Deliverables */}
					<div className="border-b border-gray-100 py-4">
						<h3 className="text-sm font-semibold text-black">
							Deliverables
						</h3>

						<p className="mt-2 whitespace-pre-wrap text-xs leading-5 text-gray-600 wrap-break-word">
							{selectedJob.deliverables}
						</p>
					</div>

					{/* Skills */}
					<div className="pt-4">
						<h3 className="text-sm font-semibold text-black">Skills</h3>

						<div className="mt-2 flex flex-wrap gap-1.5">
							{selectedJob.skills.map(skill => (
								<span
									key={skill}
									className="rounded-md border border-gray-300 px-2 py-1 text-[11px] text-gray-600"
								>
									{skill}
								</span>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
