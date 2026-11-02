import type { OnboardingAnswers } from "./onboarding-answers.js";
import type { MinimalUser } from "./minimal-user.js";

export type Participant = {
	id: string;
	chatId: string;
	userId: string;
	createdAt: Date | null;
	updatedAt: Date | null;
	user: MinimalUser & {
		onboardingAnswers: OnboardingAnswers;
	};
};

export type ChatParticipant = Pick<Participant, "user">;
