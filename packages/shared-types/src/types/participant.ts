import { OnboardingAnswers } from "./onboarding-answers.js";

export type Participant = {
	id: string;
	profilePicture: string;
	firstName: string;
	lastName: string;
	onboardingAnswers: OnboardingAnswers;
	user?: {
		id: string;
		firstName: string;
		lastName: string;
		profilePicture: string;
		onboardingAnswers: OnboardingAnswers;
	};
};
