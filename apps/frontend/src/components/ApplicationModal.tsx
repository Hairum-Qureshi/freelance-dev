import { IoMdClose } from "react-icons/io";
import { useState } from "react";

export default function ApplicationModal({
	setShowModal
}: {
	setShowModal: (show: boolean) => void;
}) {
	const [applicationReason, setApplicationReason] = useState("");

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
			<div className="w-full max-w-xl rounded-xl border border-gray-200 bg-white shadow-xl">
				{/* Header */}
				<div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
					<div>
						<h2 className="text-lg font-semibold text-gray-900">
							Apply for this job
						</h2>
						<p className="mt-1 text-sm text-gray-500">
							Tell the client briefly why you're a good fit.
						</p>
					</div>

					<button
						type="button"
						className="rounded-md p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
						onClick={() => setShowModal(false)}
						aria-label="Close application modal"
					>
						<IoMdClose className="text-xl" />
					</button>
				</div>

				{/* Content */}
				<div className="space-y-5 px-6 py-6">
					<div>
						<label
							htmlFor="application-description"
							className="mb-2 block text-sm font-medium text-gray-900"
						>
							Why would you like to apply?
						</label>

						<textarea
							id="application-description"
							rows={6}
							className="w-full resize-none rounded-lg border border-gray-300 p-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black"
							placeholder="Briefly explain why you're interested in this job and what makes you a good fit..."
							maxLength={600}
							value={applicationReason}
							onChange={e => setApplicationReason(e.target.value)}
						/>
						<p className="text-xs text-gray-500 w-full flex justify-end">
							{applicationReason.length}/600 characters
						</p>
					</div>

					{/* Resume reminder */}
					<div className="flex gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
						<div className="w-1 shrink-0 rounded-full bg-black" />

						<p className="text-sm leading-relaxed text-gray-600">
							Accounts with a resume attached to their profile are more likely
							to get noticed by potential employers.
						</p>
					</div>
				</div>

				{/* Footer */}
				<div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">
					<button
						type="button"
						className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
						onClick={() => setShowModal(false)}
					>
						Cancel
					</button>

					<button
						type="button"
						className="rounded-lg bg-black px-5 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
						onClick={() => setShowModal(false)}
					>
						Submit Application
					</button>
				</div>
			</div>
		</div>
	);
}
