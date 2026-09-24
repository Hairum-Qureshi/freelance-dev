import { TbChecks } from "react-icons/tb";
import type { Attachment } from "@repo/shared-types";

export default function ChatImageBubble({
	text,
	attachments,
	profilePicture,
	you,
	lastMessage,
	postedAt
}: {
	attachments: Attachment[];
	text?: string;
	profilePicture: string;
	you: boolean;
	lastMessage: boolean;
	postedAt: string;
}) {
	const visibleImages = attachments.slice(0, 4);
	const remainingImages = attachments.length - 4;

	// TODO - replace 'seen' with actual read receipt logic

	return (
		<div className={`flex items-start gap-2.5 p-5 ${you ? "justify-end" : ""}`}>
			<img
				className={`h-10 w-10 rounded-full ${you ? "order-2" : ""}`}
				src={profilePicture}
				referrerPolicy="no-referrer"
				alt="Profile Picture"
			/>

			<div className="max-w-7/12">
				<div className="w-fit max-w-md overflow-hidden rounded-md bg-black">
					{/* Text */}
					{text && <p className="p-3 text-sm text-white">{text}</p>}

					{/* Images */}
					<div
						className={`grid gap-1 px-1 pb-1 ${
							attachments.length === 1 ? "grid-cols-1" : "grid-cols-2"
						}`}
					>
						{visibleImages.map((image, index) => {
							const isLast = index === visibleImages.length - 1;

							const showRemaining = attachments.length > 4 && isLast;

							return (
								<button
									key={image.id}
									type="button"
									className="relative aspect-square overflow-hidden"
								>
									<img
										src={image.url}
										alt="Uploaded Image"
										className="h-full w-full object-cover pt-1"
									/>

									{showRemaining && (
										<div className="absolute inset-0 flex items-center justify-center bg-black/50">
											<span className="text-xl font-medium text-white">
												+{remainingImages}
											</span>
										</div>
									)}
								</button>
							);
						})}
					</div>
				</div>

				<div className="mt-1 flex w-full items-center justify-between gap-3">
					{lastMessage && you && (
						<span className="flex items-center gap-1 text-xs text-gray-400">
							Seen
							<TbChecks className="text-base text-green-500" />
						</span>
					)}

					<span className={`text-xs text-gray-400 ${you ? "ml-auto" : ""}`}>
						{postedAt}
					</span>
				</div>
			</div>
		</div>
	);
}
