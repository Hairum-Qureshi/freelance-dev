import type { JobPayload } from "./job-payload";
import { MinimalUser } from "./minimal-user";

export type ApplicationPayload = {
	id: string;
	jobId: string;
	applicantId: string;
	posterId: string;
	proposal: string;
	status: "pending" | "accepted" | "rejected";
	applicant: MinimalUser & { resumeId: string | null; email: string };
	job: JobPayload;
	createdAt: Date;
	updatedAt: Date;
};
