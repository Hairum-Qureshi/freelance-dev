import { TbChecks } from "react-icons/tb";

type Image = {
	id: string;
	url: string;
	alt?: string;
};

export default function ChatImageBubble({
	images,
	text,
	you,
	lastMessage
}: {
	images: Image[];
	text?: string;
	you: boolean;
	lastMessage: boolean;
}) {
	const visibleImages = images.slice(0, 4);
	const remainingImages = images.length - 4;

	return (
		<div className={`flex items-start gap-2.5 p-5 ${you ? "justify-end" : ""}`}>
			<img
				className={`h-10 w-10 rounded-full ${you ? "order-2" : ""}`}
				src="https://i.pinimg.com/236x/1d/ec/e2/1dece2c8357bdd7cee3b15036344faf5.jpg?nii=t"
				alt=""
			/>

			<div className="max-w-7/12">
				<div className="w-fit max-w-md overflow-hidden rounded-md bg-black">
					{/* Text */}
					{text && <p className="p-3 text-sm text-white">{text}</p>}

					{/* Images */}
					<div
						className={`grid gap-1 px-1 pb-1 ${
							images.length === 1 ? "grid-cols-1" : "grid-cols-2"
						}`}
					>
						{visibleImages.map((image, index) => {
							const isLast = index === visibleImages.length - 1;

							const showRemaining = images.length > 4 && isLast;

							return (
								<button
									key={image.id}
									type="button"
									className="relative aspect-square overflow-hidden"
								>
									<img
										src={image.url}
										alt={image.alt ?? ""}
										className="h-full w-full object-cover"
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
						10:29 PM
					</span>
				</div>
			</div>
		</div>
	);
}
