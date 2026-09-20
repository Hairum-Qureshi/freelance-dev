import type { OnboardingAnswers } from "./onboarding-answers.js";

export type UserPayload = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	profilePicture: string;
	completedOnboarding: boolean;
	onboardingAnswers: OnboardingAnswers;
	resumeId: string | null;
	location: string | null;
	deleted: boolean;
	createdAt: Date | string | null;
	updatedAt: Date | string | null;
};
