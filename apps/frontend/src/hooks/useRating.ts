import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { RatingsPayload } from "@repo/shared-types";
import { useParams } from "react-router-dom";

export default function useRating() {
	const { jobID } = useParams();
	const queryClient = useQueryClient();

	const postRatingMutation = useMutation({
		mutationFn: async ({
			jobId,
			rating,
			title,
			review
		}: {
			jobId: string;
			rating: number;
			title: string;
			review: string;
		}): Promise<void> => {
			if (rating < 1 || rating > 5) {
				alert("Please enter a rating between 1 and 5.");
				return;
			}

			if (!title.trim()) {
				alert("Please enter a title before sending.");
				return;
			}

			if (title.length > 100) {
				alert("Title cannot exceed 100 characters.");
				return;
			}

			if (!review.trim()) {
				alert("Please enter a review before sending.");
				return;
			}

			if (review.length > 600) {
				alert("Review cannot exceed 600 characters.");
				return;
			}

			await axios.post(
				`${import.meta.env.VITE_BACKEND_URL}/api/job/${jobId}/add-review`,
				{
					rating,
					title: title.trim(),
					review
				},
				{
					withCredentials: true
				}
			);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["ratings", jobID]
			});
		}
	});

	const { data: jobRatings } = useQuery({
		queryKey: ["ratings", jobID],
		enabled: Boolean(jobID),
		queryFn: async () => {
			if (!jobID) return null;

			const response = await axios.get<{
				average: number;
				ratings: RatingsPayload[];
			}>(`${import.meta.env.VITE_BACKEND_URL}/api/job/${jobID}/reviews`, {
				withCredentials: true
			});

			return response.data;
		}
	});

	const editRatingMutation = useMutation({
		mutationFn: async ({
			jobId,
			rating,
			title,
			review
		}: {
			jobId: string;
			rating: number;
			title: string;
			review: string;
		}): Promise<void> => {
			if (rating < 1 || rating > 5) {
				alert("Please enter a rating between 1 and 5.");
				return;
			}

			if (!title.trim()) {
				alert("Please enter a title before sending.");
				return;
			}

			if (title.length > 100) {
				alert("Title cannot exceed 100 characters.");
				return;
			}

			if (!review.trim()) {
				alert("Please enter a review before sending.");
				return;
			}

			if (review.length > 600) {
				alert("Review cannot exceed 600 characters.");
				return;
			}

			await axios.patch(
				`${import.meta.env.VITE_BACKEND_URL}/api/job/${jobId}/edit-review`,
				{
					rating,
					title: title.trim(),
					review
				},
				{
					withCredentials: true
				}
			);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["ratings", jobID]
			});
		}
	});

	const deleteRatingMutation = useMutation({
		mutationFn: async ({ jobId }: { jobId: string }): Promise<void> => {
			if (!confirm("Are you sure you want to delete this review?")) return;

			await axios.delete(
				`${import.meta.env.VITE_BACKEND_URL}/api/job/${jobId}/delete-review`,
				{
					withCredentials: true
				}
			);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["ratings", jobID]
			});
		}
	});

	return {
		postRatingMutation,
		editRatingMutation,
		deleteRatingMutation,
		jobRatings
	};
}
