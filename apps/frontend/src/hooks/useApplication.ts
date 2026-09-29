import type { ApplicationPayload } from "@repo/shared-types";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function useApplication() {
	const queryClient = useQueryClient();

	const allApplicationsQuery = useQuery({
		queryKey: ["applications"],
		queryFn: async () => {
			const response = await axios.get<ApplicationPayload[]>(
				`${import.meta.env.VITE_BACKEND_URL}/api/application/all`,
				{
					withCredentials: true
				}
			);
			return response.data;
		}
	});
	const { data: allApplications } = allApplicationsQuery;

	const { data: currUserApplications } = useQuery({
		queryKey: ["currUserApplications"],
		queryFn: async () => {
			const response = await axios.get<ApplicationPayload[]>(
				`${import.meta.env.VITE_BACKEND_URL}/api/application/all/applied`,
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
			jobTitle,
			jobId
		}: {
			applicationId: string;
			status: "accepted" | "rejected" | "pending";
			applicantName: string;
			applicantEmail: string;
			jobTitle: string;
			jobId: string;
		}): Promise<void> => {
			if (!applicationId) return;

			await axios.patch(
				`${import.meta.env.VITE_BACKEND_URL}/api/application/${applicationId}/update-status`,
				{
					status,
					applicantName,
					applicantEmail,
					jobTitle,
					jobId
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

	const withdrawApplicationMutation = useMutation({
		mutationFn: async ({
			applicationId
		}: {
			applicationId: string;
		}): Promise<void> => {
			if (!applicationId) return;

			await axios.patch(
				`${import.meta.env.VITE_BACKEND_URL}/api/application/${applicationId}/withdraw`,
				{},
				{
					withCredentials: true
				}
			);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["applications"]
			});

			queryClient.invalidateQueries({
				queryKey: ["currUserApplications"]
			});
		}
	});

	return {
		allApplications,
		allApplicationsIsPending: allApplicationsQuery.isPending,
		allApplicationsIsError: allApplicationsQuery.isError,
		currUserApplications,
		updateApplicantStatusMutation,
		withdrawApplicationMutation
	};
}
