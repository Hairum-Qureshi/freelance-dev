import { OnboardingAnswers } from "./onboarding-answers";

export type Message = {
	id: string;
	senderId: string;
	message: string;
	createdAt: Date;
	updatedAt: Date;
	sender: {
		id: string;
		firstName: string;
		lastName: string;
		profilePicture: string;
		onboardingAnswers: OnboardingAnswers;
	};
};
