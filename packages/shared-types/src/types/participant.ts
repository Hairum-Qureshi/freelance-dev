import type { OnboardingAnswers } from "./onboarding-answers.js";
import type { MinimalUser } from "./minimal-user.js";

export type Participant = {
	id: string;
	profilePicture: string;
	firstName: string;
	lastName: string;
	onboardingAnswers: OnboardingAnswers;
	user?: MinimalUser & {
		onboardingAnswers: OnboardingAnswers;
	};
};
