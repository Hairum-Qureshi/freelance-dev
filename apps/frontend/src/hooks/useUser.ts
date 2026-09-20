import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import type {
	OnboardingData,
	UseUserHook,
	UserPayload
} from "@repo/shared-types";
import { useCurrentUser } from "./useCurrentUser";

export default function useUser(): UseUserHook {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { data: currUserData } = useCurrentUser();
	const { uid: currProfileId } = useParams();
	const [searchParams] = useSearchParams();
	const targetUserId = searchParams.get("to") ?? currProfileId;

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
			queryClient.invalidateQueries({
				queryKey: ["user", targetUserId]
			});
		}
	});

	const removeResumeMutation = useMutation({
		mutationFn: async (): Promise<void> => {
			await axios.delete(
				`${import.meta.env.VITE_BACKEND_URL}/api/user/remove-resume`,
				{
					withCredentials: true
				}
			);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["currentUser"]
			});
			queryClient.invalidateQueries({
				queryKey: ["user", currProfileId]
			});
		}
	});

	const { data: userProfileData } = useQuery({
		queryKey: ["user", targetUserId],
		enabled: Boolean(targetUserId),
		queryFn: async () => {
			if (!targetUserId) return null;

			const response = await axios.get<UserPayload>(
				`${import.meta.env.VITE_BACKEND_URL}/api/user/${targetUserId}/profile`,
				{
					withCredentials: true
				}
			);
			return {
				...response.data,
				id: String(response.data.id)
			};
		}
	});

	return {
		onboardingMutation,
		attachResumeMutation,
		removeResumeMutation,
		userProfileData,
		isAddingResume: attachResumeMutation.isPending
	};
}
