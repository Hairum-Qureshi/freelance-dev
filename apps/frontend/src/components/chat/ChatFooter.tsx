import { IoMdAttach } from "react-icons/io";
import { BsFillSendFill } from "react-icons/bs";
import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useChat from "../../hooks/useChat";
import Attachment from "./Attachment";

export default function ChatFooter() {
	const [message, setMessage] = useState("");
	const { createChatMutation, createMessageMutation } = useChat();
	const [searchParams] = useSearchParams();
	const fileRef = useRef<HTMLInputElement | null>(null);
	const [attachedFiles, setAttachedFiles] = useState<File[]>([]);

	function attachFiles(e: React.ChangeEvent<HTMLInputElement>) {
		if (e.target.files) {
			console.log("Attaching files:", e.target.files);
			setAttachedFiles([...attachedFiles, ...Array.from(e.target.files)]);
		}
	}

	useEffect(() => {
		if (attachedFiles.length > 5) {
			alert("You can only attach up to 5 files.");
			setAttachedFiles(attachedFiles.slice(0, 5));
		}
	}, [attachedFiles]);

	return (
		<div className="flex min-h-24 shrink-0 flex-col border-t border-slate-200 bg-white">
			{attachedFiles.length > 0 && (
				<div className="px-4 pt-3">
					<div className="flex gap-2 overflow-x-auto">
						{attachedFiles.map((file, index) => (
							<Attachment
								key={index}
								fileType={file.type}
								fileName={file.name}
								fileSize={file.size}
							/>
						))}
					</div>
				</div>
			)}
			<div className="flex min-h-20">
				<textarea
					className="flex-1 resize-none p-4 outline-none"
					placeholder="Type a message..."
					value={message}
					onChange={e => setMessage(e.target.value)}
				/>

				<div className="flex w-16 flex-col items-center justify-between p-3 space-y-3">
					<input
						type="file"
						className="hidden"
						id="file-input"
						ref={fileRef}
						multiple
						accept="image/*,application/pdf"
						onChange={() =>
							attachFiles({
								target: { files: fileRef.current?.files }
							} as React.ChangeEvent<HTMLInputElement>)
						}
					/>
					<button
						type="button"
						className="text-slate-400 transition-colors hover:cursor-pointer hover:text-black"
						onClick={() => fileRef.current?.click()}
					>
						<IoMdAttach className="text-2xl" />
					</button>
					<button
						type="button"
						className="flex h-9 w-9 items-center justify-center rounded-md bg-black text-white transition-colors hover:cursor-pointer hover:bg-slate-800"
						onClick={() => {
							if (!attachedFiles.length && !message.trim()) {
								alert("Please enter a message before sending.");
								return;
							}

							if (searchParams.get("to")) {
								createChatMutation.mutate({ message, attachedFiles });
							} else {
								createMessageMutation.mutate({ message, attachedFiles });
							}

							setMessage("");
							setAttachedFiles([]);
						}}
					>
						<BsFillSendFill className="text-base" />
					</button>
				</div>
			</div>
		</div>
	);
}
