import type { UserPayload } from "../types/user.js";

export interface UseCurrentUserHook {
	data: UserPayload | null | undefined;
	isPending: boolean;
	isError: boolean;
}
