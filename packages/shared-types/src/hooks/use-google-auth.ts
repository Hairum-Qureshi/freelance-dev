import type { UseMutationResult } from "@tanstack/react-query";

export interface GoogleSignInResponse {
	newAccount: boolean;
}

export interface UseGoogleAuthHook {
	googleSignInMutation: UseMutationResult<
		GoogleSignInResponse,
		Error,
		string,
		unknown
	>;
	signOutMutation: UseMutationResult<void, Error, void, unknown>;
}
