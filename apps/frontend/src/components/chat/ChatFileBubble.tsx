import { TbChecks, TbDownload } from "react-icons/tb";
import { FiFile, FiFileText, FiImage } from "react-icons/fi";

type FileAttachment = {
	id: string;
	name: string;
	size: string;
	type: string;
	url: string;
};

function getFileIcon(type: string) {
	if (type.startsWith("image/")) {
		return <FiImage className="text-2xl" />;
	}

	if (
		type === "application/pdf" ||
		type.includes("word") ||
		type.includes("text")
	) {
		return <FiFileText className="text-2xl" />;
	}

	return <FiFile className="text-2xl" />;
}

export default function ChatFileBubble({
	file,
	text,
	you,
	lastMessage
}: {
	file: FileAttachment;
	text?: string;
	you: boolean;
	lastMessage: boolean;
}) {
	return (
		<div className={`flex items-start gap-2.5 p-5 ${you ? "justify-end" : ""}`}>
			<img
				className={`h-10 w-10 rounded-full ${you ? "order-2" : ""}`}
				src="https://i.pinimg.com/236x/1d/ec/e2/1dece2c8357bdd7cee3b15036344faf5.jpg?nii=t"
				alt=""
			/>

			<div className="max-w-7/12">
				<div className="w-fit max-w-md overflow-hidden rounded-md bg-black">
					{/* Optional message text */}
					{text && <p className="p-3 text-sm text-white">{text}</p>}

					{/* File */}
					<a
						href={file.url}
						target="_blank"
						rel="noopener noreferrer"
						className="flex min-w-72 items-center gap-3 p-3 text-white transition-colors hover:bg-slate-800"
					>
						<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white text-black">
							{getFileIcon(file.type)}
						</div>

						<div className="min-w-0 flex-1">
							<p className="truncate text-sm font-medium">{file.name}</p>

							<p className="mt-0.5 text-xs text-slate-400">{file.size}</p>
						</div>

						<TbDownload className="shrink-0 text-xl text-slate-400" />
					</a>
				</div>

				{/* Metadata */}
				<div className="mt-1 flex w-full items-center justify-between gap-3">
					{lastMessage && you && (
						<span className="flex items-center gap-1 text-xs text-gray-400">
							Seen
							<TbChecks className="text-base text-green-500" />
						</span>
					)}

					<span className={`text-xs text-gray-400 ${you ? "ml-auto" : ""}`}>
						10:29 PM
					</span>
				</div>
			</div>
		</div>
	);
}
