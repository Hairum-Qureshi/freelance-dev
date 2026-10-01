import type { RatingsPayload } from "@repo/shared-types";
import type { JSX } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function ReviewCard({
	rating,
	renderShadedStars
}: {
	rating: RatingsPayload;
	renderShadedStars: (rating: number) => JSX.Element[];
}) {
	return (
		<div className="border-b border-slate-200 py-5">
			{/* Review Header */}
			<div className="flex items-start justify-between gap-4">
				<div>
					<h2 className="text-base font-semibold text-slate-900">
						{rating.title ?? "Review Title"}
					</h2>

					<div className="mt-1 flex items-center gap-1">
						{renderShadedStars(parseFloat(rating.rating))}

						<span className="ml-1 text-xs font-medium text-slate-500">
							{rating.rating}
						</span>
					</div>
				</div>

				<span className="text-xs text-slate-400">{dayjs(rating.createdAt).fromNow()}</span>
			</div>

			{/* Review Body */}
			<p className="mt-3 text-sm leading-6 text-slate-600">{rating.review}</p>

			{/* Reviewer */}
			<div className="mt-4 flex items-center gap-2">
				<div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-600">
					{rating.poster.firstName[0]}
					{rating.poster.lastName[0]}
				</div>

				<div>
					<p className="text-xs font-medium text-slate-700">
						{rating.poster.firstName} {rating.poster.lastName}
					</p>
					<p className="text-[11px] text-slate-400">Client</p>
				</div>
			</div>
		</div>
	);
}
