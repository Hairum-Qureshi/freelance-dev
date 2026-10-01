import type { MinimalUser } from "./minimal-user";
import { OnboardingAnswers } from "./onboarding-answers";
import { Attachment } from "./attachment";

export type Message = {
	id: string;
	senderId: string;
	message: string;
	createdAt: Date;
	updatedAt: Date;
	sender: MinimalUser & {
		onboardingAnswers: OnboardingAnswers;
	};
	attachments: Attachment[];
};
