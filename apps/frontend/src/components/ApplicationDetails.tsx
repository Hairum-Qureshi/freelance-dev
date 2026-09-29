import type { ApplicationPayload } from "@repo/shared-types";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa6";
import { TbCancel } from "react-icons/tb";
import { useState } from "react";
import useApplication from "../hooks/useApplication";
import useJob from "../hooks/useJob";
import { useCurrentUser } from "../hooks/useCurrentUser";

export default function ApplicationDetails({
	application,
	setSelectedApplicationId
}: {
	application: ApplicationPayload;
	setSelectedApplicationId: (id: string | null) => void;
}) {
	const { applicant } = application;
	const navigate = useNavigate();
	const { data: currUser } = useCurrentUser();
	const resumeUrl = applicant.resumeId
		? `${import.meta.env.VITE_IMAGE_KIT_URL_ENDPOINT}/profiles/${applicant.id}/Resume.pdf?v=${applicant.resumeId}`
		: null;
	const { updateApplicantStatusMutation } = useApplication();
	const [showSetPaymentPrice, setShowSetPaymentPrice] = useState(false);
	const [paymentPrice, setPaymentPrice] = useState<number>();
	const { setPaymentPriceMutation } = useJob();

	return (
		<div className="px-6 py-5">
			<div className="border-b border-slate-200 pb-4">
				<div className="flex items-center justify-between">
					<p className="text-xs font-medium uppercase tracking-wide text-slate-400">
						{showSetPaymentPrice ? "Set Payment Price" : "Application from"}
					</p>
					{application.status === "accepted" && currUser?.role === "hirer" && (
						<div className="mt-4 flex ml-auto space-x-2">
							{!showSetPaymentPrice ? (
								<button
									className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:cursor-pointer hover:bg-black/80"
									onClick={() => setShowSetPaymentPrice(true)}
								>
									Update Payment Price
								</button>
							) : (
								<button
									className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:cursor-pointer hover:bg-black/80"
									onClick={() => setShowSetPaymentPrice(false)}
								>
									Cancel
								</button>
							)}
							{application.job.agreedPaymentRateCents && (
								<button
									className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:cursor-pointer hover:bg-green-700"
									onClick={() => navigate(`/payment/${application.id}`)}
								>
									Pay {applicant.firstName}
								</button>
							)}
						</div>
					)}
				</div>
				<h2
					className={`${application.status !== "accepted" && "mt-1"} text-lg font-semibold text-slate-950`}
				>
					{applicant.firstName} {applicant.lastName}
				</h2>
				<p className="mt-1 text-sm text-slate-600">{applicant.email}</p>
			</div>

			{!showSetPaymentPrice ? (
				<>
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
								<FaArrowUpRightFromSquare
									aria-hidden="true"
									className="text-xs"
								/>
							</Link>
						) : (
							<p className="mt-2 text-sm text-slate-500">No resume attached.</p>
						)}
					</section>
					{currUser?.role === "hirer" && (
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
								{applicant.firstName} will automatically be notified of your
								decision via email.
							</p>
						</section>
					)}
				</>
			) : (
				<section className="border-b border-slate-200 py-5">
					<div className="flex items-center justify-between gap-3">
						<h3 className="text-sm font-semibold text-slate-950">
							Agreed Payment Rate
						</h3>
					</div>
					<p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-700 wrap-break-word">
						{!application.job.agreedPaymentRateCents ? (
							`You currently have not agreed on a payment rate. Once you have agreed on a rate, the "Pay ${applicant.firstName}" button will become available.`
						) : (
							<>
								You have agreed on a payment rate of{" "}
								<span className="font-medium text-green-700">
									${(application.job.agreedPaymentRateCents / 100).toFixed(2)}
								</span>
								.
							</>
						)}
					</p>
					<div className="mt-4">
						<label className="block text-sm font-medium text-slate-700">
							Payment amount
						</label>

						<div className="mt-2 flex w-fit items-center overflow-hidden rounded-lg border border-slate-300 bg-white shadow-sm focus-within:border-slate-500 focus-within:ring-2 focus-within:ring-slate-200">
							<span className="border-r border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-500">
								$
							</span>
							<input
								type="number"
								value={paymentPrice}
								onChange={e => setPaymentPrice(Number(e.target.value))}
								min={application.job.salaryMin}
								max={application.job.salaryMax}
								className="w-28 border-0 px-3 py-2 text-sm font-medium text-slate-700 outline-none focus:ring-0"
							/>
							<button
								type="button"
								className="bg-slate-100 px-3 py-2 text-sm font-medium hover:cursor-pointer text-slate-700 hover:bg-slate-200"
								onClick={() => {
									setShowSetPaymentPrice(true);
									setPaymentPriceMutation.mutate({
										applicationId: application.id,
										paymentPrice: paymentPrice ?? 0,
										jobSalaryMin: application.job.salaryMin,
										jobSalaryMax: application.job.salaryMax
									});
								}}
							>
								Set
							</button>
						</div>

						<div className="mt-3 rounded-md bg-slate-50 px-3 py-2.5 text-sm text-slate-500">
							<p>
								Your payment must be within the salary range you specified for
								this job:
							</p>

							<p className="mt-1 font-medium text-slate-700">
								${application.job.salaryMin} – ${application.job.salaryMax}
							</p>
						</div>
						<div className="mt-3">
							<p className="mt-1 text-sm text-slate-500">
								{applicant.firstName} will be emailed whenever you set the
								agreed payment amount.
							</p>
						</div>
					</div>
				</section>
			)}
		</div>
	);
}
