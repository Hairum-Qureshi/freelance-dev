import type {
	UseMutateFunction,
	UseMutationResult
} from "@tanstack/react-query";

export interface UseStripeHook {
	createStripeConnectedAccount: UseMutateFunction<string, Error, void, unknown>;
	isPending: boolean;
	createPaymentIntent: UseMutationResult<
		{ clientSecret: string },
		Error,
		{ applicationId: string; hiredUserId: string },
		unknown
	>;
}
