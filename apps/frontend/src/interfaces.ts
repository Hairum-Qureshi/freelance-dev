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
	signOutMutation: UseMutationResult<void, Error, void, unknown>;
}

interface OnboardingData {
	role: "Hire" | "Work" | null;
	budget?: string;
	hiringFor?: string[];
	interests?: string[];
	seekingProjects?: string[];
	experience?: string;
	hopes?: string[];
	technologies?: string[];
	responseTime?: string;
}

export type { GoogleSignInResponse, UseGoogleAuthHook, OnboardingData };
