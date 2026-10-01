import type { MinimalUser } from "./minimal-user";

export type JobPayload = {
	id: string;
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
	salaryMin: number;
	salaryMax: number;
	agreedPaymentRateCents: number | null;
	skills: string[];
	posterId: string;
	poster: MinimalUser & { email: string };
	createdAt: Date;
	updatedAt: Date;
};
