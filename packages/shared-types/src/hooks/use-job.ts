import type { UseMutationResult } from "@tanstack/react-query";
import type { JobPayload } from "../types/job-payload.js";

export interface UseJobHook {
	postJobListingMutation: UseMutationResult<
		{ jobID: string },
		Error,
		{
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
		},
		unknown
	>;
	allJobs: JobPayload[] | undefined;
	job: JobPayload | undefined;
	applyToJobMutation: UseMutationResult<
		void,
		Error,
		{ applicationReason: string; posterId: string },
		unknown
	>;
	setPaymentPriceMutation: UseMutationResult<
		void,
		Error,
		{
			applicationId: string;
			paymentPrice: number;
			jobSalaryMin: number;
			jobSalaryMax: number;
		},
		unknown
	>;
}
