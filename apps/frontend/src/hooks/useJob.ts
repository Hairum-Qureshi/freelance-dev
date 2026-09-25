import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function useJob() {
	const navigate = useNavigate();

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
			budgetMin,
			budgetMax,
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
			budgetMin: string;
			budgetMax: string;
			skills: string[];
		}): Promise<void> => {
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
				budgetMin,
				budgetMax
			];

			if (allFieldsFilled.some(field => !field.trim())) {
				alert("All fields must be filled");
				return;
			}

			if (skills.length === 0) {
				alert("At least one skill must be specified");
				return;
			}

			if (parseFloat(budgetMin) > parseFloat(budgetMax)) {
				alert("Minimum budget cannot be greater than maximum budget");
				return;
			}

			if (parseFloat(budgetMin) < 0) {
				alert("Minimum budget cannot be negative");
				return;
			}

			if (parseFloat(budgetMax) < 0) {
				alert("Maximum budget cannot be negative");
				return;
			}

			if (jobTitle.length < 10 || jobTitle.length > 100) {
				alert("Job title must be between 10 and 100 characters");
				return;
			}

			if (projectDetails.length < 20 || projectDetails.length > 1000) {
				alert("Project details must be between 20 and 1000 characters");
				return;
			}

			if (deliverables.length < 20 || deliverables.length > 1000) {
				alert("Deliverables must be between 20 and 1000 characters");
				return;
			}

			await axios.post(
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
					budgetMin: parseInt(budgetMin),
					budgetMax: parseInt(budgetMax),
					skills: Array.from(new Set(skills))
				},
				{
					withCredentials: true
				}
			);
		},
		onSuccess: listingID => {
			console.log(">>>>", listingID);
			// queryClient.invalidateQueries({
			// 	queryKey: ["chats"]
			// });
			// queryClient.invalidateQueries({
			// 	queryKey: ["messages", chatID]
			// });
			// navigate(`/inbox/c/${chatID}`);
		}
	});

	return { postJobListingMutation };
}
