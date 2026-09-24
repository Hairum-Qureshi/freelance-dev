import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { MdOutlineCircle } from "react-icons/md";
import { GiPlainCircle } from "react-icons/gi";

export default function SlideShow({
	setShowSlideshowOverlay,
	images,
	clickedImageIndex,
	setClickedImageIndex
}: {
	setShowSlideshowOverlay: (show: boolean) => void;
	images: string[];
	clickedImageIndex: number;
	setClickedImageIndex: (index: number) => void;
}) {
	return (
		<div
			className="absolute bg-black/70 top-0 left-0 w-full h-full flex items-center justify-center"
			onClick={() => setShowSlideshowOverlay(false)}
		>
			<div
				className="relative flex justify-center items-center w-3/4 h-3/4"
				onClick={e => e.stopPropagation()}
			>
				<button
					className="absolute -left-5 text-white text-3xl m-10 hover:cursor-pointer"
					onClick={() =>
						setClickedImageIndex(
							clickedImageIndex - 1 < 0
								? images.length - 1
								: clickedImageIndex - 1
						)
					}
				>
					<FaArrowLeft />
				</button>
				<button
					className="absolute -right-4 text-white text-3xl m-10 hover:cursor-pointer"
					onClick={() =>
						setClickedImageIndex(
							clickedImageIndex + 1 === images.length
								? 0
								: clickedImageIndex + 1
						)
					}
				>
					<FaArrowRight />
				</button>
				<img
					src={images[clickedImageIndex]}
					alt="Slideshow Image"
					className="w-full h-full object-contain object-center"
				/>
				<div className="flex absolute bottom-0 mb-10 items-center justify-center space-x-2">
					{new Array(images.length)
						.fill(0)
						.map((_, index) =>
							index === clickedImageIndex ? (
								<MdOutlineCircle key={index} className="text-white text-base" />
							) : (
								<GiPlainCircle key={index} className="text-white text-base" />
							)
						)}
				</div>
			</div>
		</div>
	);
}
