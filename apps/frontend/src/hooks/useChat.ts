import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ChatPayload, Message } from "@repo/shared-types";

export default function useChat() {
	const queryClient = useQueryClient();
	const { chatID } = useParams();
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();

	const createChatMutation = useMutation({
		mutationFn: async ({
			message,
			attachedFiles
		}: {
			message: string;
			attachedFiles: File[];
		}): Promise<void> => {
			if (!message.trim()) {
				alert("Please enter a message before sending.");
				return;
			}

			const formData = new FormData();
			formData.append("chatID", chatID ?? "");
			formData.append("to", searchParams.get("to") ?? "");
			formData.append("message", message);
			attachedFiles.forEach(file => formData.append("attachments", file));

			await axios.post(
				`${import.meta.env.VITE_BACKEND_URL}/api/chat/create`,
				formData,
				{
					withCredentials: true
				}
			);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["chats"]
			});

			queryClient.invalidateQueries({
				queryKey: ["messages", chatID]
			});

			navigate(`/inbox/c/${chatID}`);
		}
	});

	const createMessageMutation = useMutation({
		mutationFn: async ({
			message,
			attachedFiles
		}: {
			message: string;
			attachedFiles: File[];
		}): Promise<void> => {
			if (!message.trim() && attachedFiles.length === 0) {
				alert("Please enter a message or attach a file before sending.");
				return;
			}

			const formData = new FormData();
			formData.append("message", message);
			attachedFiles.forEach(file => formData.append("attachments", file));

			await axios.post(
				`${import.meta.env.VITE_BACKEND_URL}/api/chat/${chatID}/message`,
				formData,
				{
					withCredentials: true
				}
			);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["messages", chatID]
			});
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

	const { data: chatMessages } = useQuery({
		queryKey: ["messages", chatID],
		queryFn: async () => {
			if (!chatID) return [];

			const response = await axios.get<Message[]>(
				`${import.meta.env.VITE_BACKEND_URL}/api/chat/${chatID}`,
				{
					withCredentials: true
				}
			);
			return response.data;
		}
	});

	return {
		createChatMutation,
		createMessageMutation,
		currUserChats,
		chatMessages
	};
}
