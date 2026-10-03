export type ReviewPayload = {
	id: string;
	posterId: string;
	jobPosterId: string;
	title: string;
	review: string;
	createdAt: Date;
	updatedAt: Date;
};
