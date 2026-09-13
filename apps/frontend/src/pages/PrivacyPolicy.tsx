import { Link } from "react-router-dom";
import { FaShieldAlt, FaLock, FaUserCheck, FaDatabase } from "react-icons/fa";

export default function PrivacyPolicy() {
	return (
		<div className="min-h-screen bg-white px-4 py-12 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-4xl">
				{/* Header */}
				<div className="mb-10 text-center sm:text-left">
					<div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-slate-100 text-gray-700 rounded-full mb-3">
						<FaShieldAlt className="text-gray-600" />
						Legal & Trust
					</div>
					<h1 className="text-3xl sm:text-4xl font-bold text-black tracking-tight">
						Privacy Policy
					</h1>
					<p className="mt-2 text-sm sm:text-base text-gray-600">
						Last updated: September 2026
					</p>
				</div>

				{/* Introduction Box */}
				<div className="rounded-2xl border border-gray-200 bg-slate-50/60 p-6 sm:p-8 mb-8">
					<p className="text-sm sm:text-base text-gray-700 leading-relaxed">
						At <strong>Freelance Dev</strong>, we believe in privacy without
						confusing legal jargon. This policy plainly explains what
						information we collect, why we need it, and how we keep it secure
						when you use our platform.
					</p>
				</div>

				{/* Key Highlights */}
				<div className="grid gap-4 sm:grid-cols-3 mb-10">
					<div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
						<div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-gray-800 mb-3">
							<FaUserCheck size={16} />
						</div>
						<h3 className="font-semibold text-gray-900 text-sm mb-1">
							We don't sell data
						</h3>
						<p className="text-xs text-gray-600 leading-relaxed">
							Your personal information is never sold to third-party advertisers
							or brokers.
						</p>
					</div>

					<div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
						<div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-gray-800 mb-3">
							<FaLock size={16} />
						</div>
						<h3 className="font-semibold text-gray-900 text-sm mb-1">
							Secure authentication
						</h3>
						<p className="text-xs text-gray-600 leading-relaxed">
							We utilize Google OAuth and encrypted tokens to safeguard your
							account.
						</p>
					</div>

					<div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
						<div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-gray-800 mb-3">
							<FaDatabase size={16} />
						</div>
						<h3 className="font-semibold text-gray-900 text-sm mb-1">
							You control your info
						</h3>
						<p className="text-xs text-gray-600 leading-relaxed">
							You can update your profile info or request account removal at any
							time.
						</p>
					</div>
				</div>

				{/* Detailed Sections */}
				<div className="space-y-8 rounded-2xl border border-gray-200 bg-white p-6 sm:p-10 shadow-sm">
					<section>
						<h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
							1. What Information We Collect
						</h2>
						<div className="space-y-3 text-sm text-gray-700 leading-relaxed">
							<p>
								We collect minimal information necessary to deliver our
								freelance marketplace services:
							</p>
							<ul className="list-disc list-inside space-y-1.5 pl-2 text-gray-600">
								<li>
									<strong className="text-gray-800">Account details:</strong>{" "}
									Name, email address, and avatar image obtained when you sign
									in with Google OAuth.
								</li>
								<li>
									<strong className="text-gray-800">
										Profile & Portfolio info:
									</strong>{" "}
									Bio, skills, role (Client or Freelancer), rates, GitHub links,
									and work samples you choose to share.
								</li>
								<li>
									<strong className="text-gray-800">
										Job and Proposal data:
									</strong>{" "}
									Job postings, budget details, proposal pitches, and
									communication in direct messages.
								</li>
								<li>
									<strong className="text-gray-800">Payment details:</strong>{" "}
									Transaction records handled securely through our payment
									provider (Stripe). We never store raw credit card numbers on
									our servers.
								</li>
							</ul>
						</div>
					</section>

					<div className="border-t border-gray-100" />

					<section>
						<h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
							2. How We Use Your Information
						</h2>
						<div className="space-y-2 text-sm text-gray-700 leading-relaxed">
							<p>We use your information exclusively to:</p>
							<ul className="list-disc list-inside space-y-1.5 pl-2 text-gray-600">
								<li>
									Allow clients and freelancers to discover and connect with
									each other.
								</li>
								<li>Power your public profile and portfolio showcase.</li>
								<li>
									Send important service alerts, notifications, and inbox
									messages.
								</li>
								<li>
									Maintain platform safety, prevent spam, and improve user
									experience.
								</li>
							</ul>
						</div>
					</section>

					<div className="border-t border-gray-100" />

					<section>
						<h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
							3. Information Sharing
						</h2>
						<p className="text-sm text-gray-700 leading-relaxed">
							Your public profile (name, bio, skills, portfolio links, and
							reviews) is visible to other users on the platform. We only share
							private details with trusted third-party providers required to
							operate the service (e.g., authentication via Google, database
							hosting, and payment processing via Stripe).
						</p>
					</section>

					<div className="border-t border-gray-100" />

					<section>
						<h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
							4. Data Retention & Deletion
						</h2>
						<p className="text-sm text-gray-700 leading-relaxed">
							You retain full ownership of your data. If you ever decide to
							delete your account or want your profile data wiped, you can
							request account deletion at any time through our{" "}
							<Link
								to="/contact"
								className="text-black font-semibold underline underline-offset-2 hover:text-gray-700"
							>
								Contact page
							</Link>
							.
						</p>
					</section>

					<div className="border-t border-gray-100" />

					<section>
						<h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
							5. Questions or Concerns?
						</h2>
						<p className="text-sm text-gray-700 leading-relaxed">
							Have questions regarding your privacy? Feel free to reach out to
							us via our{" "}
							<Link
								to="/contact"
								className="text-black font-semibold underline underline-offset-2 hover:text-gray-700"
							>
								Contact page
							</Link>
							.
						</p>
					</section>
				</div>
			</div>
		</div>
	);
}
