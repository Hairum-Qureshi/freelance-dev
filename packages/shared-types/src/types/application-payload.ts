import type { JobPayload } from "./job-payload";

export type ApplicationPayload = {
	id: string;
	jobId: string;
	applicantId: string;
	posterId: string;
	proposal: string;
	status: "pending" | "accepted" | "rejected";
	applicant: {
		id: string;
		firstName: string;
		lastName: string;
		profilePicture: string;
		email: string;
		resumeId: string | null;
	};
	job: JobPayload;
	createdAt: Date;
	updatedAt: Date;
};
