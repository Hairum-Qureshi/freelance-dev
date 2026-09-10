import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import type { GoogleSignInResponse, UseGoogleAuthHook } from "../interfaces";
import { useMutation } from "@tanstack/react-query";

export default function useGoogleAuth(): UseGoogleAuthHook {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const googleSignInMutation = useMutation({
		mutationFn: async (accessToken: string): Promise<GoogleSignInResponse> => {
			const response = await axios.post<GoogleSignInResponse>(
				`${import.meta.env.VITE_BACKEND_URL}/api/auth/google/sign-in`,
				{},
				{
					headers: {
						Authorization: `Bearer ${accessToken}`
					},
					withCredentials: true
				}
			);

			return response.data;
		},

		onSuccess: async ({ newAccount }) => {
			await queryClient.invalidateQueries({
				queryKey: ["currentUser"]
			});

			if (newAccount) navigate("/onboarding");
			else navigate("/");
		}
	});

	const signOut = async () => {
		await axios.post(
			`${import.meta.env.VITE_BACKEND_URL}/api/auth/sign-out`,
			{},
			{
				withCredentials: true
			}
		);

		queryClient.setQueryData(["currentUser"], null);
		queryClient.removeQueries({ queryKey: ["total-notifications"] });
		queryClient.removeQueries({ queryKey: ["your-chats"] });
	};

	return { googleSignInMutation, signOut };
}
