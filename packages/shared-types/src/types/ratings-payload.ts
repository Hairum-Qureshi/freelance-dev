import type { MinimalUser } from "./minimal-user";
import type { UserRole } from "./user-role";

export type RatingsPayload = {
	id: string;
	jobId: string;
	posterId: string;
	rating: string;
	title: string;
	review: string;
	role: UserRole;
	poster: MinimalUser;
	createdAt: string;
	updatedAt: string;
};
