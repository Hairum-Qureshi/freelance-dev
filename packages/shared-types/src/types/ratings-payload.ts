import type { MinimalUser } from "./minimal-user";

export type RatingsPayload = {
	id: string;
	jobId: string;
	posterId: string;
	rating: string;
	review: string;
	poster: MinimalUser;
	createdAt: string;
	updatedAt: string;
};
