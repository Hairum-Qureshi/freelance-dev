import type { UserPayload } from "./user.ts";

export type AuthRequest = Request & {
	user?: UserPayload;
};
