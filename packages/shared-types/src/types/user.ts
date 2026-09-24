import type { OnboardingAnswers } from "./onboarding-answers.js";
import type { UserRole } from "./user-role.js";

export type UserPayload = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	profilePicture: string;
	role: UserRole | null;
	completedOnboarding: boolean;
	onboardingAnswers: OnboardingAnswers;
	resumeId: string | null;
	location: string | null;
	deleted: boolean;
	createdAt: Date | string | null;
	updatedAt: Date | string | null;
};
