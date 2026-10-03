import type { UseMutationResult } from "@tanstack/react-query";
import type { ApplicationPayload } from "../types/application-payload.js";

export interface UseApplicationHook {
	allApplications: ApplicationPayload[] | undefined;
	allApplicationsIsPending: boolean;
	allApplicationsIsError: boolean;
	currUserApplications: ApplicationPayload[] | undefined;
	updateApplicantStatusMutation: UseMutationResult<
		void,
		Error,
		{
			applicationId: string;
			status: "accepted" | "rejected" | "pending";
			applicantName: string;
			applicantEmail: string;
			jobTitle: string;
			jobId: string;
		},
		unknown
	>;
	withdrawApplicationMutation: UseMutationResult<
		void,
		Error,
		{ applicationId: string },
		unknown
	>;
}
