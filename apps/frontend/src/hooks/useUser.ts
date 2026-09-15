import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import type { UseMutationResult } from "@tanstack/react-query";
import axios from "axios";
import type { OnboardingData } from "../interfaces";
import { useCurrentUser } from "./useCurrentUser";

interface UseUserHook {
	onboardingMutation: UseMutationResult<
		void,
		Error,
		{ onboardingData: OnboardingData },
		unknown
	>;
	attachResumeMutation: UseMutationResult<void, Error, { file: File }, unknown>;
}

export default function useUser(): UseUserHook {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { data: currUserData } = useCurrentUser();

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
			navigate(`/p/${currUserData?.id}`);
		}
	});

	const attachResumeMutation = useMutation({
		mutationFn: async ({ file }: { file: File }): Promise<void> => {
			const formData = new FormData();
			formData.append("resume", file);

			await axios.patch(
				`${import.meta.env.VITE_BACKEND_URL}/api/user/attach-resume`,
				formData,
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

	return { onboardingMutation, attachResumeMutation };
}
