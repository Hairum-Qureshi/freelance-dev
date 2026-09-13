import { TbChecks } from "react-icons/tb";

export default function ChatBubble({
	text,
	you,
	lastMessage
}: {
	text: string;
	you: boolean;
	lastMessage: boolean;
}) {
	return (
		<div className={`flex items-start gap-2.5 p-5 ${you ? "justify-end" : ""}`}>
			<img
				className={`w-10 h-10 rounded-full ${you ? "order-2" : ""}`}
				src="https://i.pinimg.com/236x/1d/ec/e2/1dece2c8357bdd7cee3b15036344faf5.jpg?nii=t"
			/>

			<div className="max-w-7/12">
				<div className="w-fit max-w-full p-3 rounded-md bg-black text-white">
					<p className="text-sm">{text}</p>
				</div>

				<div className="flex items-center justify-between gap-3 mt-1 w-full">
					{lastMessage && you && (
						<span className="text-xs text-gray-400 flex items-center gap-1">
							Seen
							<TbChecks className="text-base text-green-500" />
						</span>
					)}

					<span className={`${you && "ml-auto"} text-xs text-gray-400`}>
						10:29 PM
					</span>
				</div>
			</div>
		</div>
	);
}
