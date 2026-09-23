import { IoClose } from "react-icons/io5";

export default function Attachment({
	fileType,
	fileName,
	fileSize
}: {
	fileType: string;
	fileName: string;
	fileSize: number;
}) {
	function formatFileSize(bytes: number) {
		if (bytes < 1024) {
			return `${bytes} B`;
		}

		if (bytes < 1024 ** 2) {
			return `${(bytes / 1024).toFixed(1)} KB`;
		}

		if (bytes < 1024 ** 3) {
			return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
		}

		return `${(bytes / 1024 ** 3).toFixed(1)} GB`;
	}

	return (
		<div className="flex w-52 shrink-0 items-center gap-3 rounded-md border border-slate-200 p-2">
			<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-slate-100">
				<span className="text-xs font-medium text-slate-500">
					{fileType === "application/pdf" ? "PDF" : "IMG"}
				</span>
			</div>

			<div className="min-w-0 flex-1">
				<p className="truncate text-sm font-medium text-slate-700">
					{fileName}
				</p>
				<p className="text-xs text-slate-400">{formatFileSize(fileSize)}</p>
			</div>

			<button
				type="button"
				className="text-slate-400 transition-colors hover:text-black"
			>
				<IoClose className="text-lg" />
			</button>
		</div>
	);
}
