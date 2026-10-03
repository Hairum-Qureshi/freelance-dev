import type { UseMutationResult } from "@tanstack/react-query";
import type { RatingsPayload } from "../types/ratings-payload.js";

export interface UseRatingHook {
	postRatingMutation: UseMutationResult<
		void,
		Error,
		{ jobId: string; rating: number; title: string; review: string },
		unknown
	>;
	editRatingMutation: UseMutationResult<
		void,
		Error,
		{ jobId: string; rating: number; title: string; review: string },
		unknown
	>;
	deleteRatingMutation: UseMutationResult<
		void,
		Error,
		{ jobId: string },
		unknown
	>;
	jobRatings: { average: number; ratings: RatingsPayload[] } | null | undefined;
}
