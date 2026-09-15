import AdCard from "../components/AdCard";
import ReviewCard from "../components/ReviewCard";
import { IoStarSharp } from "react-icons/io5";
import { IoIosStarHalf } from "react-icons/io";
import { FaEdit } from "react-icons/fa";

export default function Listing() {
	return (
		<div className="min-h-screen w-full bg-slate-100 px-4 py-6 sm:px-6">
			<div className="flex flex-row w-[87%] m-auto space-x-4">
				<div className="w-1/2">
					<AdCard />
				</div>
				<div className="w-1/2">
					<div className="h-fit rounded-md border border-slate-300 bg-white p-5 shadow-sm">
						{/* Header */}
						<div className="flex items-center justify-between">
							<h1 className="text-lg font-semibold text-slate-900">
								Reviews (2)
							</h1>

							<button className="flex items-center gap-2 rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
								<FaEdit className="text-xs" />
								Write a Review
							</button>
						</div>

						{/* Rating Summary */}
						<div className="mt-5 flex items-center rounded-md bg-slate-50 p-4">
							<div>
								<p className="text-3xl font-semibold text-slate-900">4.5</p>

								<div className="mt-1 flex gap-1">
									<IoStarSharp className="text-yellow-500" />
									<IoStarSharp className="text-yellow-500" />
									<IoStarSharp className="text-yellow-500" />
									<IoStarSharp className="text-yellow-500" />
									<IoIosStarHalf className="text-yellow-500" />
								</div>

								<p className="mt-1 text-xs text-slate-500">
									Based on 2 reviews
								</p>
							</div>
						</div>

						{/* Reviews */}
						<div className="mt-2">
							<ReviewCard />
							<ReviewCard />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
