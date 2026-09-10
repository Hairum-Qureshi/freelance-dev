import type { UseMutationResult } from "@tanstack/react-query";

interface UseGoogleAuthHook {
	googleSignInMutation: UseMutationResult<void, Error, string, unknown>;
	signOut: () => Promise<void>;
}

export type { UseGoogleAuthHook };
