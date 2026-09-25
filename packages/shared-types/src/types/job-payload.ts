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
	skills: string[];
	posterId: string;
	poster: {
		id: string;
		firstName: string;
		lastName: string;
		profilePicture: string;
		email: string;
	};
	createdAt: Date;
	updatedAt: Date;
};
