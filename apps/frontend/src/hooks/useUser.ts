import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UseMutationResult } from "@tanstack/react-query";
import axios from "axios";
import type { OnboardingData } from "../interfaces";

interface UseUserHook {
	onboardingMutation: UseMutationResult<
		void,
		Error,
		{ onboardingData: OnboardingData },
		unknown
	>;
}

export default function useUser(): UseUserHook {
	const queryClient = useQueryClient();

	const onboardingMutation = useMutation({
		mutationFn: async ({
			onboardingData
		}: {
			onboardingData: OnboardingData;
		}): Promise<void> => {
			await axios.post(
				`${import.meta.env.VITE_BACKEND_URL}/api/user/onboarding/answers`,
				onboardingData,
				{
					withCredentials: true
				}
			);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["currentUser"]
			});
		}
	});

	return { onboardingMutation };
}
