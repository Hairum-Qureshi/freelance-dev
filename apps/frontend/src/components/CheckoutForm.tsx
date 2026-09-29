import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState, type FormEvent } from "react";

export default function CheckoutForm({ applicationId }: { applicationId: string }) {
	const stripe = useStripe();
	const elements = useElements();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		if (!stripe || !elements || isSubmitting) return;

		setIsSubmitting(true);
		setErrorMessage(null);

		const { error } = await stripe.confirmPayment({
			elements,
			confirmParams: {
				return_url: `${window.location.origin}/payment/${applicationId}`
			}
		});

		if (error) {
			setErrorMessage(error.message ?? "Your payment could not be confirmed.");
			setIsSubmitting(false);
		}
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<PaymentElement />
			{errorMessage && (
				<p role="alert" className="text-sm text-red-700">
					{errorMessage}
				</p>
			)}
			<button
				type="submit"
				disabled={!stripe || !elements || isSubmitting}
				className="w-full rounded-md bg-slate-900 px-4 py-3 text-sm font-medium text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
			>
				{isSubmitting ? "Processing..." : "Pay securely"}
			</button>
		</form>
	);
}