import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

export default function useChat() {
	const { chatID } = useParams();
	const [searchParams] = useSearchParams();

	const createChatMutation = useMutation({
		mutationFn: async ({ message }: { message: string }): Promise<void> => {
			await axios.post(
				`${import.meta.env.VITE_BACKEND_URL}/api/chat/create`,
				{
					chatID,
					to: searchParams.get("to"),
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
