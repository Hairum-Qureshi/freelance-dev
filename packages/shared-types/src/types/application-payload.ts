import { JobPayload } from "./job-payload";

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
	};
	job: JobPayload;
	createdAt: Date;
	updatedAt: Date;
};
