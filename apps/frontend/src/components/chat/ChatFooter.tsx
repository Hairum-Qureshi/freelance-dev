import { IoMdAttach } from "react-icons/io";
import { BsFillSendFill } from "react-icons/bs";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import useChat from "../../hooks/useChat";

export default function ChatFooter() {
	const [message, setMessage] = useState("");
	const { createChatMutation, createMessageMutation } = useChat();
	const [searchParams] = useSearchParams();

	return (
		<div className="flex min-h-24 shrink-0 flex-col border-t border-slate-200 bg-white">
			{/* <div className="px-4 pt-3">
				<div className="flex gap-2 overflow-x-auto">
					<Attachment />
					<Attachment />
				</div>
			</div> */}
			<div className="flex min-h-20">
				<textarea
					className="flex-1 resize-none p-4 outline-none"
					placeholder="Type a message..."
					value={message}
					onChange={e => setMessage(e.target.value)}
				/>

				<div className="flex w-16 flex-col items-center justify-between p-3 space-y-3">
					<button
						type="button"
						className="text-slate-400 transition-colors hover:cursor-pointer hover:text-black"
					>
						<IoMdAttach className="text-2xl" />
					</button>
					<button
						type="button"
						className="flex h-9 w-9 items-center justify-center rounded-md bg-black text-white transition-colors hover:cursor-pointer hover:bg-slate-800"
						onClick={() => {
							if (!message.trim()) {
								alert("Please enter a message before sending.");
								return;
							}

							if (searchParams.get("to")) {
								createChatMutation.mutate({ message });
							} else {
								createMessageMutation.mutate({ message });
							}

							setMessage("");
						}}
					>
						<BsFillSendFill className="text-base" />
					</button>
				</div>
			</div>
		</div>
	);
}
