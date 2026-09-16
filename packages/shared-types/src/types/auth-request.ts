import type { UserPayload } from "./user.js";

export type AuthRequest = Request & {
	user?: UserPayload;
};
