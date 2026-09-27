import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function useStripe() {
	const queryClient = useQueryClient();

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
			});

			// Redirect to Stripe's hosted onboarding flow
			window.location.href = url;
		}
	});

	return {
		createStripeConnectedAccount,
		isPending
	};
}
