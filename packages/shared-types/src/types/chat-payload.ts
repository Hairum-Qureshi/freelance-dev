import { Message } from "./message.js";
import { Participant } from "./participant.js";

export type ChatPayload = {
	id: string;
	participants: [user: Participant];
	messages: Message[];
};
