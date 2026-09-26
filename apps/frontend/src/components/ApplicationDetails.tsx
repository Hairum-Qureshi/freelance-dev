import type { ApplicationPayload } from "@repo/shared-types";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function ApplicationDetails({
	application,
}: {
	application: ApplicationPayload;
}) {
	const { applicant } = application;
	const resumeUrl = applicant.resumeId
		? `${import.meta.env.VITE_IMAGE_KIT_URL_ENDPOINT}/profiles/${applicant.id}/Resume.pdf?v=${applicant.resumeId}`
		: null;

	return (
		<div className="px-6 py-5">
			<div className="border-b border-slate-200 pb-4">
				<p className="text-xs font-medium uppercase tracking-wide text-slate-400">
					Application from
				</p>
				<h2 className="mt-1 text-lg font-semibold text-slate-950">
					{applicant.firstName} {applicant.lastName}
				</h2>
				<p className="mt-1 text-sm text-slate-600">{applicant.email}</p>
			</div>

			<section className="border-b border-slate-200 py-5">
				<div className="flex items-center justify-between gap-3">
					<h3 className="text-sm font-semibold text-slate-950">Proposal</h3>
					<span className="rounded-full border border-slate-200 px-2.5 py-1 text-xs font-medium capitalize text-slate-600">
						{application.status}
					</span>
				</div>
				<p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-700 wrap-break-word">
					{application.proposal}
				</p>
			</section>

			<section className="py-5">
				<h3 className="text-sm font-semibold text-slate-950">Resume</h3>
				{resumeUrl ? (
					<Link
						to={resumeUrl}
						target="_blank"
						rel="noreferrer"
						className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-slate-700 underline decoration-slate-300 underline-offset-4 hover:text-slate-950"
					>
						View {applicant.firstName}&apos;s resume
						<FaArrowUpRightFromSquare aria-hidden="true" className="text-xs" />
					</Link>
				) : (
					<p className="mt-2 text-sm text-slate-500">No resume attached.</p>
				)}
			</section>
		</div>
	);
}
