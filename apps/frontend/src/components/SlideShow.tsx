import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { MdOutlineCircle } from "react-icons/md";
import { GiPlainCircle } from "react-icons/gi";

export default function SlideShow({
	setShowSlideshowOverlay
}: {
	setShowSlideshowOverlay: (show: boolean) => void;
}) {
	return (
		<div
			className="absolute bg-black/70 top-0 left-0 w-full h-full flex items-center justify-center"
			onClick={() => setShowSlideshowOverlay(false)}
		>
			<div
				className="border border-white flex justify-center items-center w-3/4 h-3/4"
				onClick={e => e.stopPropagation()}
			>
				<button className="absolute left-2 text-white text-3xl m-10 hover:cursor-pointer">
					<FaArrowLeft />
				</button>
				<button className="absolute right-2 text-white text-3xl m-10 hover:cursor-pointer">
					<FaArrowRight />
				</button>
				<img
					src=""
					alt="Slideshow Image"
					className="max-w-full max-h-full object-cover"
				/>
				<div className="flex absolute bottom-0 mb-10 items-center justify-center space-x-2">
					<MdOutlineCircle className="text-white text-base" />
					<GiPlainCircle className="text-white text-base" />
					<GiPlainCircle className="text-white text-base" />
					<GiPlainCircle className="text-white text-base" />
					<GiPlainCircle className="text-white text-base" />
				</div>
			</div>
		</div>
	);
}
