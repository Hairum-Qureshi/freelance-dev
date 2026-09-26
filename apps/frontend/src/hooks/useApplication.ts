import type { ApplicationPayload } from "@repo/shared-types";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function useApplication() {
	const queryClient = useQueryClient();

	const { data: allApplications } = useQuery({
		queryKey: ["applications"],
		queryFn: async () => {
			const response = await axios.get<ApplicationPayload[]>(
				`${import.meta.env.VITE_BACKEND_URL}/api/job/applications/all`,
				{
					withCredentials: true
				}
			);
			return response.data;
		}
	});

	const updateApplicantStatusMutation = useMutation({
		mutationFn: async ({
			applicationId,
			status,
			applicantName,
			applicantEmail,
			jobTitle
		}: {
			applicationId: string;
			status: "accepted" | "rejected" | "pending";
			applicantName: string;
			applicantEmail: string;
			jobTitle: string;
		}): Promise<void> => {
			if (!applicationId) return;

			await axios.patch(
				`${import.meta.env.VITE_BACKEND_URL}/api/job/application/${applicationId}/update-status`,
				{
					status,
					applicantName,
					applicantEmail,
					jobTitle
				},
				{
					withCredentials: true
				}
			);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["applications"]
			});
		}
	});

	return { allApplications, updateApplicantStatusMutation };
}
