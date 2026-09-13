import { IoMdAttach } from "react-icons/io";
import { BsFillSendFill } from "react-icons/bs";
import Attachment from "./Attachment";

export default function ChatFooter() {
	return (
		<div className="flex min-h-24 shrink-0 flex-col border-t border-slate-200 bg-white">
			<div className="px-4 pt-3">
				<div className="flex gap-2 overflow-x-auto">
					<Attachment />
					<Attachment />
				</div>
			</div>
			<div className="flex min-h-20">
				<textarea
					className="flex-1 resize-none p-4 outline-none"
					placeholder="Type a message..."
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
					>
						<BsFillSendFill className="text-base" />
					</button>
				</div>
			</div>
		</div>
	);
}
