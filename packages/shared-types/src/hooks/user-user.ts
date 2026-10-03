import type { UseMutationResult } from "@tanstack/react-query";
import type { OnboardingData } from "../types/onboarding-data.js";
import type { UserPayload } from "../types/user.js";
import { ReviewPayload } from "../types/review-payload.js";

export interface UseUserHook {
	onboardingMutation: UseMutationResult<
		void,
		Error,
		{ onboardingData: OnboardingData },
		unknown
	>;
	attachResumeMutation: UseMutationResult<void, Error, { file: File }, unknown>;
	userProfileData: UserPayload | null | undefined;
	removeResumeMutation: UseMutationResult<void, Error, void, unknown>;
	userProfileReviews: ReviewPayload[];
	isAddingResume: boolean;
}
