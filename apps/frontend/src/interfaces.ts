import type { UseMutationResult } from "@tanstack/react-query";

interface GoogleSignInResponse {
	newAccount: boolean;
}

interface UseGoogleAuthHook {
	googleSignInMutation: UseMutationResult<
		GoogleSignInResponse,
		Error,
		string,
		unknown
	>;
	signOut: () => Promise<void>;
}

export type { GoogleSignInResponse, UseGoogleAuthHook };
