import type { JobPayload } from "@repo/shared-types";

export default function JobDetails({ selectedJob }: { selectedJob: JobPayload }) {
	const postedDate = new Date(selectedJob.createdAt).toLocaleDateString();

	return (
		<div className="px-6 py-5">
			<div className="border-b border-slate-200 pb-4">
				<h2 className="text-lg font-semibold text-slate-950">
					{selectedJob.jobTitle}
				</h2>
				<p className="mt-1 text-sm text-slate-600">{selectedJob.businessName}</p>
				<p className="mt-1 text-xs text-slate-400">Posted {postedDate}</p>
			</div>

			<section className="border-b border-slate-200 py-4">
				<div className="flex items-center justify-between gap-3">
					<div>
						<p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
							Compensation
						</p>
						<p className="mt-1 text-base font-semibold text-green-700">
							${selectedJob.salaryMin.toLocaleString()} - ${selectedJob.salaryMax.toLocaleString()}
						</p>
					</div>
					<span className="rounded-md border border-slate-300 px-2 py-1 text-[11px] text-slate-600">
						{selectedJob.paymentType}
					</span>
				</div>
			</section>

			<section className="border-b border-slate-200 py-4">
				<h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
					Job Details
				</h3>
				<dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3">
					<div><dt className="text-[11px] text-slate-400">Project Type</dt><dd className="mt-0.5 text-xs text-slate-800">{selectedJob.projectType}</dd></div>
					<div><dt className="text-[11px] text-slate-400">Job Type</dt><dd className="mt-0.5 text-xs text-slate-800">{selectedJob.jobType}</dd></div>
					<div><dt className="text-[11px] text-slate-400">Experience</dt><dd className="mt-0.5 text-xs text-slate-800">{selectedJob.experienceLevel}</dd></div>
					<div><dt className="text-[11px] text-slate-400">Timeline</dt><dd className="mt-0.5 text-xs text-slate-800">{selectedJob.timeline}</dd></div>
					<div><dt className="text-[11px] text-slate-400">Work Location</dt><dd className="mt-0.5 text-xs text-slate-800">{selectedJob.workLocation}</dd></div>
					<div><dt className="text-[11px] text-slate-400">Region</dt><dd className="mt-0.5 text-xs text-slate-800">{selectedJob.region}</dd></div>
				</dl>
			</section>

			<section className="border-b border-slate-200 py-4">
				<h3 className="text-sm font-semibold text-slate-950">Project Details</h3>
				<p className="mt-2 whitespace-pre-wrap text-xs leading-5 text-slate-600 wrap-break-word">
					{selectedJob.projectDetails}
				</p>
			</section>

			<section className="border-b border-slate-200 py-4">
				<h3 className="text-sm font-semibold text-slate-950">Looking For</h3>
				<p className="mt-2 whitespace-pre-wrap text-xs leading-5 text-slate-600">
					{selectedJob.lookingFor}
				</p>
			</section>

			<section className="border-b border-slate-200 py-4">
				<h3 className="text-sm font-semibold text-slate-950">Deliverables</h3>
				<p className="mt-2 whitespace-pre-wrap text-xs leading-5 text-slate-600 wrap-break-word">
					{selectedJob.deliverables}
				</p>
			</section>

			<section className="pt-4">
				<h3 className="text-sm font-semibold text-slate-950">Skills</h3>
				<div className="mt-2 flex flex-wrap gap-1.5">
					{selectedJob.skills.map(skill => (
						<span key={skill} className="rounded-md border border-slate-300 px-2 py-1 text-[11px] text-slate-600">
							{skill}
						</span>
					))}
				</div>
			</section>
		</div>
	);
}
