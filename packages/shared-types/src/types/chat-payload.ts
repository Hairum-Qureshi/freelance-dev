import type { ChatParticipant } from "./participant.js";

export type ChatPayload = {
	id: string;
	latestMessage: {
		id: string;
		message: string;
		createdAt: Date;
		updatedAt: Date;
	};
	participants: ChatParticipant[];
};
