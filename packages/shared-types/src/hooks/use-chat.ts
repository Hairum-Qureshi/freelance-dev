import type { UseMutationResult } from "@tanstack/react-query";
import type { ChatPayload } from "../types/chat-payload.js";
import type { Message } from "../types/message.js";
import type { Participant } from "../types/participant.js";

export interface UseChatHook {
	createChatMutation: UseMutationResult<
		void,
		Error,
		{ message: string; attachedFiles: File[] },
		unknown
	>;
	createMessageMutation: UseMutationResult<
		void,
		Error,
		{ message: string; attachedFiles: File[] },
		unknown
	>;
	currUserChats: ChatPayload[] | undefined;
	chatMessages: Message[] | undefined;
	chatParticipants: Participant[] | undefined;
}
