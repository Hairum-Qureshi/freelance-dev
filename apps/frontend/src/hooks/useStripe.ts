import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function useStripe() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { mutate: createStripeConnectedAccount, isPending } = useMutation({
		mutationFn: async (): Promise<string> => {
			const { data } = await axios.post<{ url: string }>(
				`${import.meta.env.VITE_BACKEND_URL}/api/stripe/create-connected-account`,
				{},
				{
					withCredentials: true
				}
			);

			return data.url;
		},
		onSuccess: url => {
			queryClient.invalidateQueries({
				queryKey: ["currentUser"]
			});			navigate(url);
		}
	});

	const createPaymentIntent = useMutation({
		mutationFn: async ({
			applicationId,
			hiredUserId
		}: {
			applicationId: string;
			hiredUserId: string;
		}): Promise<{ clientSecret: string }> => {
			const response = await axios.post<{ clientSecret: string }>(
				`${import.meta.env.VITE_BACKEND_URL}/api/stripe/${applicationId}/create-payment-intent`,
				{ hiredUserId },
				{
					withCredentials: true
				}
			);

			return response.data;
		}
	});

	return {
		createStripeConnectedAccount,
		isPending,
		createPaymentIntent
	};
}
