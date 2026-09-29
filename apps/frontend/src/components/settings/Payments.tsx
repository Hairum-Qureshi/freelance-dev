import useStripe from "../../hooks/useStripe";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { Link } from "react-router-dom";

export default function Payments() {
	const { data: currentUser } = useCurrentUser();
	const { createStripeConnectedAccount, isPending } = useStripe();
	const isWorker = currentUser?.role === "freelancer";
	const hasStripeAccount = Boolean(currentUser?.stripeAccountConnected);

	return (
		<section>
			<h2 className="text-xl font-semibold text-gray-900">
				{isWorker ? "Payment" : "Payment History"}
			</h2>
			<p className="mt-1 text-sm text-gray-500">
				{isWorker
					? "View your past payments and transactions."
					: "Manage the payment methods you use to pay freelancers."}
			</p>
			{!hasStripeAccount ? (
				isWorker ? (
					<>
						<div className="mt-6 rounded-md border border-gray-300 p-4">
							<div className="flex items-start justify-between gap-4">
								<div>
									<h3 className="font-medium text-gray-900">Payout status</h3>
									<p className="mt-1 text-sm text-gray-500">
										Your Stripe account is not connected yet.
									</p>
								</div>
								<span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
									Not connected
								</span>
							</div>
						</div>
						<div className="mt-5">
							<h3 className="font-medium text-gray-900">Receive payments</h3>
							<p className="mt-1 text-sm text-gray-500">
								Connect a Stripe account to receive payments from clients for
								completed work.
							</p>
							<div className="mt-4 rounded-md bg-gray-50 p-4">
								<p className="text-sm text-gray-600">
									Stripe will securely collect the information required to
									verify your identity and set up payouts.
								</p>
								<ul className="mt-3 list-inside list-disc space-y-1 text-sm text-gray-500">
									<li>Personal or business information</li>
									<li>Identity verification information</li>
									<li>Payout bank account information</li>
									<li>Tax information when required</li>
								</ul>
							</div>
							<button
								type="button"
								className="mt-4 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
								onClick={() => createStripeConnectedAccount()}
								disabled={isPending}
							>
								{isPending ? "Setting up Stripe..." : "Set up payouts"}
							</button>
						</div>
					</>
				) : (
					<>
						<div className="mt-6">
							<p className="mt-1 text-sm text-gray-500">
								View your past payments and transactions.
							</p>
							<div className="mt-4 rounded-md border border-dashed border-gray-300 p-6 text-center">
								<p className="text-sm text-gray-500">
									No payments have been made yet. <br /> To make a payment, view
									your hired applications{" "}
									<Link
										to="http://localhost:5173/applicants/all?hired=true"
										className="text-blue-600 hover:underline"
									>
										here
									</Link>
									.
								</p>
							</div>
						</div>
					</>
				)
			) : (
				<div className="mt-6 rounded-md bg-green-50 p-4">
					<h3 className="font-medium text-green-900">Stripe Connected</h3>
					<p className="mt-1 text-sm text-green-700">
						You have successfully set up your Stripe account for payouts.
					</p>
				</div>
			)}
		</section>
	);
}
