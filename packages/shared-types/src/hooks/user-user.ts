import type { UseMutationResult } from "@tanstack/react-query";
import { OnboardingData } from "../types/onboarding-data.js";
import { UserPayload } from "../types/user.js";

export interface UseUserHook {
	onboardingMutation: UseMutationResult<
		void,
		Error,
		{ onboardingData: OnboardingData },
		unknown
	>;
	attachResumeMutation: UseMutationResult<void, Error, { file: File }, unknown>;
	userProfileData: UserPayload;
	removeResumeMutation: UseMutationResult<void, Error, void, unknown>;
	isAddingResume: boolean;
}
