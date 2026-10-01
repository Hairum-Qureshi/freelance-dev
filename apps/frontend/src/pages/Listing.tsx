import AdCard from "../components/AdCard";
import ReviewCard from "../components/ReviewCard";
import { IoStarSharp } from "react-icons/io5";
import { IoIosStarHalf } from "react-icons/io";
import { MdStarBorder } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import useJob from "../hooks/useJob";
import NotFound from "./NotFound";
import { useState } from "react";
import ReviewEditor from "../components/ReviewEditor";
import useRating from "../hooks/useRating";
import { useCurrentUser } from "../hooks/useCurrentUser";

export default function Listing() {
	const [showReviewEditor, setShowReviewEditor] = useState(false);
	const [editReviewMode, setEditReviewMode] = useState(false);
	const { data: currUser } = useCurrentUser();

	const { job } = useJob();

	const { jobRatings } = useRating();

	const hasRated = jobRatings?.ratings.some(
		rating => rating.posterId === currUser?.id
	);

	if (!job) return <NotFound />;

	const stars = [
		<MdStarBorder className="text-yellow-500 text-lg" />,
		<MdStarBorder className="text-yellow-500 text-lg" />,
		<MdStarBorder className="text-yellow-500 text-lg" />,
		<MdStarBorder className="text-yellow-500 text-lg" />,
		<MdStarBorder className="text-yellow-500 text-lg" />
	];

	// TODO - make it so that if you already posted a review, the 'add review' button doesn't show. Also have it so that the edit and delete buttons are available for your own reviews.

	function renderShadedStars(rating: number) {
		for (let i = 1; i <= 5; i++) {
			stars[i - 1] = <IoStarSharp className="text-yellow-500" />;
			if (rating < i && !Number.isInteger(rating)) {
				stars[i - 1] = <IoIosStarHalf className="text-yellow-500" />;
				break;
			}
			if (i > rating)
				stars[i - 1] = <MdStarBorder className="text-yellow-500" />;
		}

		return stars.map((star, index) => <span key={index}>{star}</span>);
	}

	return (
		<div className="min-h-screen w-full bg-slate-100 px-4 py-6 sm:px-6">
			<div className="flex flex-row w-[87%] m-auto space-x-4">
				<div className="w-1/2">
					<AdCard job={job} />
				</div>
				<div className="w-1/2">
					<div className="h-fit rounded-md border border-slate-300 bg-white p-5 shadow-sm">
						{/* Header */}
						<div className="flex items-center justify-between">
							<h1 className="text-lg font-semibold text-slate-900">
								Reviews ({jobRatings?.ratings?.length ?? 0})
							</h1>

							{hasRated ? null : !showReviewEditor && !editReviewMode ? (
								<button
									className="flex items-center gap-2 rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:cursor-pointer"
									onClick={() => setShowReviewEditor(true)}
								>
									<FaEdit className="text-xs" />
									Write a Review
								</button>
							) : (
								<button
									className="flex items-center gap-2 rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:cursor-pointer"
									onClick={() =>
										editReviewMode
											? setEditReviewMode(false)
											: setShowReviewEditor(false)
									}
								>
									Cancel Review
								</button>
							)}
						</div>

						{/* Rating Summary */}
						<div className="mt-5 flex items-center rounded-md bg-slate-50 p-4">
							<div>
								<p className="text-3xl font-semibold text-slate-900">
									{jobRatings?.average ?? 0}
								</p>

								<div className="mt-1 flex gap-1 items-center">
									{renderShadedStars(jobRatings?.average ?? 0)}
								</div>

								<p className="mt-1 text-xs text-slate-500">
									Based on {jobRatings?.ratings?.length ?? 0} review
									{(jobRatings?.ratings?.length ?? 0) !== 1 ? "s" : ""}
								</p>
							</div>
						</div>

						{/* Reviews */}
						<div className="mt-2">
							{showReviewEditor && (
								<ReviewEditor
									setShowReviewEditor={setShowReviewEditor}
									jobId={job.id}
								/>
							)}

							{jobRatings?.ratings?.length ? (
								jobRatings.ratings.map(rating =>
									rating.posterId === currUser?.id && editReviewMode ? (
										<ReviewEditor
											key={rating.id}
											setShowReviewEditor={setShowReviewEditor}
											jobId={job.id}
											editRating={parseFloat(rating.rating)}
											editTitle={rating.title}
											editReview={rating.review}
											isEditMode
											setEditReviewMode={setEditReviewMode}
										/>
									) : (
										<ReviewCard
											key={rating.id}
											rating={rating}
											renderShadedStars={renderShadedStars}
											setEditReviewMode={setEditReviewMode}
											isOwner={rating.posterId === currUser?.id}
										/>
									)
								)
							) : (
								<p className="text-sm text-slate-500 text-center my-5">
									No reviews yet.
								</p>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
