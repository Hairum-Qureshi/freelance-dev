export type ApplicationPayload = {
	id: string;
	jobId: string;
	applicantId: string;
	proposal: string;
	status: "pending" | "accepted" | "rejected";
	applicant: {
		id: string;
		firstName: string;
		lastName: string;
		profilePicture: string;
		email: string;
	};
	createdAt: Date;
	updatedAt: Date;
};
