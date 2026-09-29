import type { JobPayload } from "@repo/shared-types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function useJob() {
	const navigate = useNavigate();
	const { jobID } = useParams();
	const queryClient = useQueryClient();

	const postJobListingMutation = useMutation({
		mutationFn: async ({
			jobTitle,
			businessName,
			projectType,
			lookingFor,
			experienceLevel,
			jobType,
			paymentType,
			workLocation,
			region,
			timeline,
			projectDetails,
			deliverables,
			salaryMin,
			salaryMax,
			skills
		}: {
			jobTitle: string;
			businessName: string;
			projectType: string;
			lookingFor: string;
			experienceLevel: string;
			jobType: string;
			paymentType: string;
			workLocation: string;
			region: string;
			timeline: string;
			projectDetails: string;
			deliverables: string;
			salaryMin: string;
			salaryMax: string;
			skills: string[];
		}): Promise<{ jobID: string }> => {
			const allFieldsFilled = [
				jobTitle,
				businessName,
				projectType,
				lookingFor,
				experienceLevel,
				jobType,
				paymentType,
				workLocation,
				region,
				timeline,
				projectDetails,
				deliverables,
				salaryMin,
				salaryMax
			];

			if (allFieldsFilled.some(field => !field.trim())) {
				throw new Error("All fields must be filled");
			}

			if (skills.length === 0) {
				throw new Error("At least one skill must be specified");
			}

			if (parseInt(salaryMin) > parseInt(salaryMax)) {
				throw new Error("Minimum budget cannot be greater than maximum budget");
			}

			if (parseInt(salaryMin) < 0) {
				throw new Error("Minimum budget cannot be negative");
			}

			if (parseInt(salaryMax) < 0) {
				throw new Error("Maximum budget cannot be negative");
			}

			if (jobTitle.length < 10 || jobTitle.length > 100) {
				throw new Error("Job title must be between 10 and 100 characters");
			}

			if (projectDetails.length < 20 || projectDetails.length > 1000) {
				throw new Error(
					"Project details must be between 20 and 1000 characters"
				);
			}

			if (deliverables.length < 20 || deliverables.length > 1000) {
				throw new Error("Deliverables must be between 20 and 1000 characters");
			}

			const response = await axios.post(
				`${import.meta.env.VITE_BACKEND_URL}/api/job/create`,
				{
					jobTitle,
					businessName,
					projectType,
					lookingFor,
					experienceLevel,
					jobType,
					paymentType,
					workLocation,
					region,
					timeline,
					projectDetails,
					deliverables,
					salaryMin: parseInt(salaryMin),
					salaryMax: parseInt(salaryMax),
					skills: Array.from(new Set(skills))
				},
				{
					withCredentials: true
				}
			);

			return response.data;
		},
		onSuccess: (response: { jobID: string }) => {
			if (response.jobID) navigate(`/listing/${response.jobID}`);
		}
	});

	const { data: allJobs } = useQuery({
		queryKey: ["jobs"],
		queryFn: async () => {
			const response = await axios.get<JobPayload[]>(
				`${import.meta.env.VITE_BACKEND_URL}/api/job/all`,
				{
					withCredentials: true
				}
			);
			return response.data;
		}
	});

	const { data: job } = useQuery({
		queryKey: ["job", jobID],
		queryFn: async () => {
			if (!jobID) return;

			const response = await axios.get<JobPayload>(
				`${import.meta.env.VITE_BACKEND_URL}/api/job/${jobID}`,
				{
					withCredentials: true
				}
			);
			return response.data;
		}
	});

	const applyToJobMutation = useMutation({
		mutationFn: async ({
			applicationReason,
			posterId
		}: {
			applicationReason: string;
			posterId: string;
		}): Promise<void> => {
			if (!jobID) return;

			if (!applicationReason.trim()) {
				alert("Application reason cannot be empty");
				return;
			}

			if (applicationReason.length < 20 || applicationReason.length > 600) {
				alert("Application reason must be between 20 and 600 characters");
				return;
			}

			await axios.post(
				`${import.meta.env.VITE_BACKEND_URL}/api/job/${jobID}/apply`,
				{
					proposal: applicationReason,
					posterId
				},
				{
					withCredentials: true
				}
			);
		}
	});

	const setPaymentPriceMutation = useMutation({
		mutationFn: async ({
			applicationId,
			paymentPrice,
			jobSalaryMin,
			jobSalaryMax
		}: {
			applicationId: string;
			paymentPrice: number;
			jobSalaryMin: number;
			jobSalaryMax: number;
		}): Promise<void> => {
			if (!paymentPrice) {
				alert("Payment price is required");
				return;
			}

			if (paymentPrice === 0) {
				alert("Payment price cannot be zero");
				return;
			}

			if (paymentPrice < jobSalaryMin) {
				alert(
					`Payment price cannot be less than the minimum salary of ${jobSalaryMin}`
				);
				return;
			}

			if (paymentPrice > jobSalaryMax) {
				alert(
					`Payment price cannot be greater than the maximum salary of ${jobSalaryMax}`
				);
				return;
			}

			await axios.patch(
				`${import.meta.env.VITE_BACKEND_URL}/api/application/${applicationId}/set-payment-price`,
				{
					paymentPrice
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

	return {
		postJobListingMutation,
		allJobs,
		job,
		applyToJobMutation,
		setPaymentPriceMutation
	};
}
