import { IoStarSharp } from "react-icons/io5";
import { IoIosStarHalf } from "react-icons/io";

export default function ReviewCard() {
	return (
		<div className="border-b border-slate-200 py-5">
			{/* Review Header */}
			<div className="flex items-start justify-between gap-4">
				<div>
					<h2 className="text-base font-semibold text-slate-900">
						Review Title
					</h2>

					<div className="mt-1 flex items-center gap-1">
						<IoStarSharp className="text-sm text-yellow-500" />
						<IoStarSharp className="text-sm text-yellow-500" />
						<IoStarSharp className="text-sm text-yellow-500" />
						<IoStarSharp className="text-sm text-yellow-500" />
						<IoIosStarHalf className="text-sm text-yellow-500" />

						<span className="ml-1 text-xs font-medium text-slate-500">4.5</span>
					</div>
				</div>

				<span className="text-xs text-slate-400">2 weeks ago</span>
			</div>

			{/* Review Body */}
			<p className="mt-3 text-sm leading-6 text-slate-600">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum
				dolor sit amet, consectetur adipiscing elit.
			</p>

			{/* Reviewer */}
			<div className="mt-4 flex items-center gap-2">
				<div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-600">
					JD
				</div>

				<div>
					<p className="text-xs font-medium text-slate-700">John Doe</p>
					<p className="text-[11px] text-slate-400">Client</p>
				</div>
			</div>
		</div>
	);
}
