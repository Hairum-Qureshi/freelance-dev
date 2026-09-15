import { useCurrentUser } from "../../hooks/useCurrentUser";
import {
	FaArrowLeftLong,
	FaArrowUpRightFromSquare,
	FaDownload,
	FaFilePdf,
	FaTrashCan
} from "react-icons/fa6";
import { saveAs } from "file-saver";
import { Link } from "react-router-dom";

export default function Resume({
	setShowResume
}: {
	setShowResume: (show: boolean) => void;
}) {
	const { data: currUserData } = useCurrentUser();
	const resumeUrl = currUserData?.resumeUrl;
	const pdfUrl = resumeUrl ?? "https://pdfobject.com/pdf/sample.pdf";
	const displayName =
		`${currUserData?.firstName ?? ""} ${currUserData?.lastName ?? ""}`.trim();

	return (
		<main className="overflow-hidden rounded-md border border-slate-300 bg-white shadow-sm">
			<div className="flex flex-col gap-5 border-b border-slate-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
				<div>
					<button
						type="button"
						className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:cursor-pointer hover:text-slate-950"
						onClick={() => setShowResume(false)}
					>
						<FaArrowLeftLong aria-hidden="true" />
						Back to profile
					</button>
					<h1 className="text-2xl font-semibold tracking-tight text-slate-950">
						{displayName ? `${displayName}'s resume` : "Resume"}
					</h1>
					<p className="mt-1 text-sm text-slate-500">
						A closer look at this freelancer's experience and work.
					</p>
				</div>

				<div className="flex shrink-0 gap-2">
					<button
						type="button"
						className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:cursor-pointer hover:bg-slate-50"
						onClick={() =>
							saveAs(
								pdfUrl,
								displayName ? `${displayName}'s resume.pdf` : "resume.pdf"
							)
						}
					>
						<FaDownload aria-hidden="true" />
						Download
					</button>

					<Link
						to={pdfUrl}
						target="_blank"
						rel="noreferrer"
						className="inline-flex items-center gap-2 rounded-md bg-slate-950 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800"
					>
						Open full screen
						<FaArrowUpRightFromSquare aria-hidden="true" />
					</Link>

					<div className="mx-1 w-px self-stretch bg-slate-200" />

					<button
						type="button"
						className="inline-flex items-center gap-2 rounded-md border border-rose-200 bg-white px-3 py-2 text-sm font-medium text-rose-600 transition hover:cursor-pointer hover:border-rose-300 hover:bg-rose-50"
						onClick={() => {
							// remove resume
						}}
					>
						<FaTrashCan aria-hidden="true" />
						Remove
					</button>
				</div>
			</div>

			<section
				className="bg-slate-100 px-3 py-3 sm:px-8 sm:py-8"
				aria-label="Resume document"
			>
				<div className="overflow-hidden rounded-md border border-slate-300 bg-slate-200 shadow-inner">
					<div className="flex items-center gap-3 border-b border-slate-300 bg-white px-4 py-3">
						<div className="flex h-9 w-9 items-center justify-center rounded-md bg-red-50 text-red-600">
							<FaFilePdf aria-hidden="true" />
						</div>
						<div className="min-w-0">
							<p className="truncate text-sm font-semibold text-slate-800">
								{resumeUrl ? "Uploaded resume" : "Resume preview"}
							</p>
							<p className="text-xs text-slate-500">PDF document</p>
						</div>
					</div>
					<iframe
						src={`${pdfUrl}#zoom=90#fit=page`}
						className="h-[calc(100vh-16rem)] min-h-[32rem] w-full bg-white"
						title={`${displayName || "User"}'s resume`}
					/>
				</div>
			</section>
		</main>
	);
}
