import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

export default function useChat() {
	const { chatID } = useParams();
	const [searchParams] = useSearchParams();

	const createChatMutation = useMutation({
		mutationFn: async ({ message }: { message: string }): Promise<void> => {
			if (!chatID && !searchParams.get("to")) return;

			await axios.post(
				`${import.meta.env.VITE_BACKEND_URL}/api/chat/create`,
				{
					chatID: BigInt(chatID as string),
					to: BigInt(BigInt(searchParams.get("to") as string)),
					message
				},
				{
					withCredentials: true
				}
			);
		},
		onSuccess: () => {}
	});

	return { createChatMutation };
}
