import type { OnboardingAnswers } from "./onboarding-answers.js";

export type UserPayload = {
	id: string;
	first_name: string;
	last_name: string;
	email: string;
	profile_picture: string;
	completed_onboarding: boolean;
	onboarding_answers: OnboardingAnswers;
	resume_id: string;
	location: string;
	deleted: boolean;
	created_at: Date;
	updated_at: Date;
};
