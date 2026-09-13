import { Link } from "react-router-dom";
import {
	FaCheckCircle,
	FaExclamationTriangle,
	FaHandshake
} from "react-icons/fa";

export default function TermsOfService() {
	return (
		<div className="min-h-screen bg-white px-4 py-12 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-4xl">
				{/* Header */}
				<div className="mb-10 text-center sm:text-left">
					<h1 className="text-3xl sm:text-4xl font-bold text-black tracking-tight">
						Terms of Service
					</h1>
					<p className="mt-2 text-sm sm:text-base text-gray-600">
						Last updated: September 2026
					</p>
				</div>

				{/* Introduction Box */}
				<div className="rounded-2xl border border-gray-200 bg-slate-50/60 p-6 sm:p-8 mb-8">
					<p className="text-sm sm:text-base text-gray-700 leading-relaxed">
						Welcome to <strong>Freelance Dev</strong>! By accessing or using our
						website, you agree to these simple, common-sense terms. We aim to
						keep our community safe, transparent, and supportive for both
						early-career developers and hiring clients.
					</p>
				</div>

				{/* Highlights */}
				<div className="grid gap-4 sm:grid-cols-3 mb-10">
					<div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
						<div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-gray-800 mb-3">
							<FaHandshake size={16} />
						</div>
						<h3 className="font-semibold text-gray-900 text-sm mb-1">
							Respectful collaboration
						</h3>
						<p className="text-xs text-gray-600 leading-relaxed">
							Treat clients and fellow developers with honesty, respect, and
							clear communication.
						</p>
					</div>

					<div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
						<div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-gray-800 mb-3">
							<FaCheckCircle size={16} />
						</div>
						<h3 className="font-semibold text-gray-900 text-sm mb-1">
							Authentic work
						</h3>
						<p className="text-xs text-gray-600 leading-relaxed">
							Only showcase genuine portfolios, honest project scopes, and
							truthful qualifications.
						</p>
					</div>

					<div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
						<div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-gray-800 mb-3">
							<FaExclamationTriangle size={16} />
						</div>
						<h3 className="font-semibold text-gray-900 text-sm mb-1">
							No spam or abuse
						</h3>
						<p className="text-xs text-gray-600 leading-relaxed">
							Harassment, unsolicited spam, and fraudulent listings are strictly
							prohibited.
						</p>
					</div>
				</div>

				{/* Detailed Sections */}
				<div className="space-y-8 rounded-2xl border border-gray-200 bg-white p-6 sm:p-10 shadow-sm">
					<section>
						<h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
							1. Eligibility and Accounts
						</h2>
						<div className="space-y-2 text-sm text-gray-700 leading-relaxed">
							<p>
								To register on Freelance Dev, you must sign in via Google OAuth
								and provide accurate, truthful profile information during
								onboarding.
							</p>
							<p>
								You are responsible for maintaining the security of your account
								and any activity that happens under your profile.
							</p>
						</div>
					</section>

					<div className="border-t border-gray-100" />

					<section>
						<h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
							2. Client and Freelancer Relationships
						</h2>
						<div className="space-y-3 text-sm text-gray-700 leading-relaxed">
							<p>
								Freelance Dev acts as a platform to connect clients with
								independent developers. When agreeing to work on a project:
							</p>
							<ul className="list-disc list-inside space-y-1.5 pl-2 text-gray-600">
								<li>
									<strong className="text-gray-800">Clients</strong> agree to
									clearly state project requirements, scope, deliverables, and
									promptly pay agreed-upon amounts.
								</li>
								<li>
									<strong className="text-gray-800">Freelancers</strong> agree
									to make genuine, good-faith efforts to meet agreed timelines
									and deliver quality code/designs.
								</li>
								<li>
									Contracts and work agreements are directly between the client
									and the freelancer.
								</li>
							</ul>
						</div>
					</section>

					<div className="border-t border-gray-100" />

					<section>
						<h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
							3. Code of Conduct & Prohibited Content
						</h2>
						<div className="space-y-2 text-sm text-gray-700 leading-relaxed">
							<p>When using Freelance Dev, you agree not to:</p>
							<ul className="list-disc list-inside space-y-1.5 pl-2 text-gray-600">
								<li>
									Post fake job listings, misleading salary/budget figures, or
									scam postings.
								</li>
								<li>
									Misrepresent your identity, skills, or take credit for another
									developer's work.
								</li>
								<li>
									Spam other users via the inbox or submit automated proposals.
								</li>
								<li>
									Engage in harassment, hate speech, or offensive conduct.
								</li>
							</ul>
						</div>
					</section>

					<div className="border-t border-gray-100" />

					<section>
						<h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
							4. Reviews and Feedback
						</h2>
						<p className="text-sm text-gray-700 leading-relaxed">
							Reviews and star ratings must reflect authentic experiences with
							completed freelance projects. Any attempts to manipulate ratings,
							post fake reviews, or coerce positive ratings are grounds for
							immediate account suspension.
						</p>
					</section>

					<div className="border-t border-gray-100" />

					<section>
						<h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
							5. Changes to Terms
						</h2>
						<p className="text-sm text-gray-700 leading-relaxed">
							We may update these terms periodically as we add new features to
							the platform. Continued use of Freelance Dev following updates
							constitutes acceptance of the new terms.
						</p>
					</section>

					<div className="border-t border-gray-100" />

					<section>
						<h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
							6. Contact Us
						</h2>
						<p className="text-sm text-gray-700 leading-relaxed">
							If you have questions regarding these terms, please visit our{" "}
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
