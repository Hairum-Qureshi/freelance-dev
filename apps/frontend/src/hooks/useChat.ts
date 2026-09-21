import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ChatPayload } from "@repo/shared-types";

export default function useChat() {
	const queryClient = useQueryClient();
	const { chatID } = useParams();
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();

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
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["chats"]
			});

			navigate(`/inbox/c/${chatID}`);
		}
	});

	const { data: currUserChats } = useQuery({
		queryKey: ["chats"],
		queryFn: async () => {
			const response = await axios.get<ChatPayload[]>(
				`${import.meta.env.VITE_BACKEND_URL}/api/chat/all`,
				{
					withCredentials: true
				}
			);
			return response.data;
		}
	});

	return { createChatMutation, currUserChats };
}
