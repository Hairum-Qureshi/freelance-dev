import type { ApplicationPayload } from "@repo/shared-types";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa6";
import { TbCancel } from "react-icons/tb";
import useApplication from "../hooks/useApplication";

export default function ApplicationDetails({
	application,
	setSelectedApplicationId
}: {
	application: ApplicationPayload;
	setSelectedApplicationId: (id: string | null) => void;
}) {
	const { applicant } = application;
	const resumeUrl = applicant.resumeId
		? `${import.meta.env.VITE_IMAGE_KIT_URL_ENDPOINT}/profiles/${applicant.id}/Resume.pdf?v=${applicant.resumeId}`
		: null;
	const { updateApplicantStatusMutation } = useApplication();

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
			<section className="border-t border-slate-200 pt-5">
				<div className="divide-y divide-slate-200 rounded-md border border-slate-200">
					{application.status === "pending" ? (
						<>
							<div className="flex items-center justify-between bg-gradient-to-r from-transparent to-green-50 px-4 py-3 transition-colors duration-200 hover:to-green-200">
								<span className="text-sm font-medium text-slate-700">
									Accept Application
								</span>

								<button
									className="flex h-8 w-8 items-center justify-center rounded-md text-green-600 transition-colors duration-200 hover:cursor-pointer hover:bg-green-100"
									aria-label="Accept application"
									onClick={() => {
										const confirmation = window.confirm(
											"Are you sure you want to accept this application?"
										);
										if (!confirmation) return;
										updateApplicantStatusMutation.mutate({
											applicationId: application.id,
											status: "accepted",
											applicantName: `${applicant.firstName} ${applicant.lastName}`,
											applicantEmail: applicant.email,
											jobTitle: application.job.jobTitle,
											jobId: application.job.id
										});
										setSelectedApplicationId(null);
									}}
								>
									<FaCheck aria-hidden="true" className="text-xl" />
								</button>
							</div>
							<div className="flex items-center justify-between bg-gradient-to-r from-transparent to-red-50 px-4 py-3 transition-colors duration-200 hover:to-red-200">
								<span className="text-sm font-medium text-slate-700">
									Reject Application
								</span>
								<button
									className="flex h-8 w-8 items-center justify-center rounded-md text-red-600 transition-colors duration-200 hover:cursor-pointer hover:bg-red-100"
									aria-label="Reject application"
									onClick={() => {
										const confirmation = window.confirm(
											"Are you sure you want to reject this application?"
										);
										if (!confirmation) return;
										updateApplicantStatusMutation.mutate({
											applicationId: application.id,
											status: "rejected",
											applicantName: `${applicant.firstName} ${applicant.lastName}`,
											applicantEmail: applicant.email,
											jobTitle: application.job.jobTitle,
											jobId: application.job.id
										});
										setSelectedApplicationId(null);
									}}
								>
									<TbCancel aria-hidden="true" className="text-lg" />
								</button>
							</div>
						</>
					) : (
						<div className="px-4 py-3 text-sm text-slate-700">
							This application has been {application.status}.
							<button
								className="ml-2 rounded-md hover:cursor-pointer bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
								onClick={() => {
									const confirmation = window.confirm(
										"Are you sure you want to retract this application?"
									);
									if (!confirmation) return;
									updateApplicantStatusMutation.mutate({
										applicationId: application.id,
										status: "pending",
										applicantName: `${applicant.firstName} ${applicant.lastName}`,
										applicantEmail: applicant.email,
										jobTitle: application.job.jobTitle,
										jobId: application.job.id
									});
									setSelectedApplicationId(null);
								}}
							>
								Retract
							</button>
						</div>
					)}
				</div>
				<p className="py-3 text-sm text-slate-500">
					{applicant.firstName} will automatically be notified of your decision
					via email.
				</p>
			</section>
		</div>
	);
}
