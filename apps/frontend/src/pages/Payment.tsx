import { Elements } from "@stripe/react-stripe-js";
import type { Stripe } from "@stripe/stripe-js";
import { useEffect, useRef } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import useApplication from "../hooks/useApplication";
import useStripe from "../hooks/useStripe";
import CheckoutForm from "../components/CheckoutForm";

export default function Payment({
	stripePromise
}: {
	stripePromise: Promise<Stripe | null>;
}) {
	const { applicationId } = useParams();
	const [searchParams] = useSearchParams();
	const redirectStatus = searchParams.get("redirect_status");
	const { allApplications, allApplicationsIsPending, allApplicationsIsError } =
		useApplication();
	const { createPaymentIntent } = useStripe();
	const requestedApplicationId = useRef<string | null>(null);
	const application = allApplications?.find(item => item.id === applicationId);

	useEffect(() => {
		if (!application || redirectStatus || createPaymentIntent.data) {
			return;
		}

		createPaymentIntent.mutate({
			applicationId: application.id,
			hiredUserId: application.applicant.id
		});
	}, [application, redirectStatus, createPaymentIntent.data]);

	if (redirectStatus) {
		const message =
			redirectStatus === "succeeded"
				? "Your payment was successful."
				: redirectStatus === "processing"
					? "Your payment is processing."
					: "Your payment was not completed. Please try again.";

		const isSuccess = redirectStatus === "succeeded";
		const isProcessing = redirectStatus === "processing";

		return (
			<main className="min-h-screen bg-slate-50 px-4 py-12">
				<div className="mx-auto max-w-lg">
					<div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
						<div
							className={`flex h-12 w-12 items-center justify-center rounded-full ${
								isSuccess
									? "bg-emerald-100 text-emerald-600"
									: isProcessing
										? "bg-amber-100 text-amber-600"
										: "bg-red-100 text-red-600"
							}`}
						>
							{isSuccess ? "✓" : isProcessing ? "…" : "!"}
						</div>

						<h1 className="mt-6 text-2xl font-semibold tracking-tight text-slate-900">
							Payment status
						</h1>

						<p className="mt-2 text-sm leading-6 text-slate-600">{message}</p>
					</div>
				</div>
			</main>
		);
	}

	if (allApplicationsIsPending) {
		return (
			<main className="min-h-screen bg-slate-50 px-4 py-12">
				<div className="mx-auto max-w-lg">
					<div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
						<div className="h-5 w-40 animate-pulse rounded bg-slate-200" />
						<div className="mt-3 h-4 w-64 animate-pulse rounded bg-slate-100" />
						<div className="mt-8 h-32 animate-pulse rounded-xl bg-slate-100" />
					</div>
				</div>
			</main>
		);
	}

	if (allApplicationsIsError) {
		return (
			<main className="min-h-screen bg-slate-50 px-4 py-12">
				<div className="mx-auto max-w-lg rounded-2xl border border-red-200 bg-white p-8 shadow-sm">
					<div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600">
						!
					</div>

					<p role="alert" className="mt-4 text-sm leading-6 text-red-700">
						We could not load this application. Please refresh and try again.
					</p>
				</div>
			</main>
		);
	}

	if (!application) {
		return (
			<main className="min-h-screen bg-slate-50 px-4 py-12">
				<div className="mx-auto max-w-lg rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
					<h1 className="text-lg font-semibold text-slate-900">
						Application unavailable
					</h1>

					<p className="mt-2 text-sm leading-6 text-slate-600">
						This application is unavailable or you do not have permission to pay
						it.
					</p>
				</div>
			</main>
		);
	}

	if (
		application.status !== "accepted" ||
		!application.job.agreedPaymentRateCents
	) {
		return (
			<main className="min-h-screen bg-slate-50 px-4 py-12">
				<div className="mx-auto max-w-lg rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
					<h1 className="text-lg font-semibold text-slate-900">
						Payment unavailable
					</h1>

					<p className="mt-2 text-sm leading-6 text-slate-600">
						This application does not have an agreed payment ready.
					</p>
				</div>
			</main>
		);
	}

	if (createPaymentIntent.isError) {
		return (
			<main className="min-h-screen bg-slate-50 px-4 py-12">
				<div className="mx-auto max-w-lg rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
					<div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600">
						!
					</div>

					<h1 className="mt-4 text-lg font-semibold text-slate-900">
						Payment could not be started
					</h1>

					<p role="alert" className="mt-2 text-sm leading-6 text-slate-600">
						We could not start this payment. Please try again.
					</p>

					<button
						type="button"
						className="mt-6 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700"
						onClick={() => {
							requestedApplicationId.current = null;
							createPaymentIntent.reset();
						}}
					>
						Retry
					</button>
				</div>
			</main>
		);
	}

	const clientSecret = createPaymentIntent.data?.clientSecret;

	if (!clientSecret) {
		return (
			<main className="min-h-screen bg-slate-50 px-4 py-12">
				<div className="mx-auto max-w-lg">
					<div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
						<div className="flex items-center gap-3">
							<div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-slate-900" />
							<p className="text-sm font-medium text-slate-700">
								Preparing secure checkout...
							</p>
						</div>
					</div>
				</div>
			</main>
		);
	}

	return (
		<main className="min-h-screen bg-slate-50 px-4 py-12">
			<div className="mx-auto max-w-lg">
				{/* Header */}
				<div className="mb-6">
					<p className="text-sm font-medium text-slate-500">Secure checkout</p>

					<h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">
						Complete payment
					</h1>

					<p className="mt-2 text-sm leading-6 text-slate-600">
						Review the payment details below before completing your purchase.
					</p>
				</div>

				{/* Payment card */}
				<div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
					{/* Payment summary */}
					<div className="border-b border-slate-200 px-6 py-5">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-slate-500">Payment to</p>

								<p className="mt-1 font-medium text-slate-900">
									{application.applicant.firstName}{" "}
									{application.applicant.lastName}
								</p>
							</div>

							<div className="text-right">
								<p className="text-sm text-slate-500">Total</p>

								<p className="mt-1 text-xl font-semibold text-slate-900">
									${(application.job.agreedPaymentRateCents / 100).toFixed(2)}
								</p>
							</div>
						</div>
					</div>

					{/* Checkout form */}
					<div className="px-6 py-6">
						<Elements stripe={stripePromise} options={{ clientSecret }}>
							<CheckoutForm applicationId={application.id} />
						</Elements>
					</div>

					{/* Security notice */}
					<div className="border-t border-slate-100 bg-slate-50 px-6 py-4">
						<div className="flex items-center gap-2 text-xs text-slate-500">
							<span className="flex h-5 w-5 items-center justify-center rounded-full border border-slate-300 text-[10px]">
								✓
							</span>
							<span>
								Your payment information is securely processed by Stripe.
							</span>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
