import { StarRating } from "react-flexible-star-rating";
import { useState } from "react";
import useRating from "../hooks/useRating";

export default function ReviewEditor({
	setShowReviewEditor,
	jobId
}: {
	setShowReviewEditor: (show: boolean) => void;
	jobId: string;
}) {
	const [rating, setRating] = useState(0);
	const [review, setReview] = useState("");
	const { postRatingMutation } = useRating();

	return (
		<div className="mt-3 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
			{/* Header */}
			<div className="mb-4">
				<h3 className="text-base font-semibold text-slate-900">
					Leave a review
				</h3>
				<p className="mt-1 text-sm text-slate-500">
					Share your experience working with this client.
				</p>
			</div>

			{/* Rating */}
			<div className="rounded-md border border-slate-200 bg-slate-50 p-4">
				<p className="text-sm font-medium text-slate-700">
					How would you rate this client and job?
				</p>

				<div className="mt-3 flex items-center gap-3">
					<StarRating
						onRatingChange={setRating}
						isHalfRatingEnabled
						dimension={10}
					/>

					<span className="text-sm font-medium text-slate-500">
						{rating > 0
							? `${rating} ${rating === 1 ? "star" : "stars"}`
							: "No rating"}
					</span>
				</div>
			</div>

			{/* Review */}
			<div className="mt-4">
				<label
					htmlFor="review"
					className="mb-2 block text-sm font-medium text-slate-700"
				>
					Your review
				</label>

				<textarea
					id="review"
					className="min-h-20 w-full resize-y rounded-md border border-slate-300 bg-white p-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 h-24 max-h-40 focus:ring-slate-200"
					placeholder="What went well? What should other freelancers know?"
					required
					maxLength={600}
					value={review}
					onChange={e => setReview(e.target.value)}
				/>
			</div>

			{/* Submit */}
			<div className="mt-4 flex justify-end">
				<button
					type="button"
					disabled={rating === 0}
					className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
					onClick={() => {
						postRatingMutation.mutate({ jobId, rating, review });
						setShowReviewEditor(false);
					}}
				>
					Submit review
				</button>
			</div>
		</div>
	);
}
