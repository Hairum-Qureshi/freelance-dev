import { Link } from "react-router-dom";
import {
	FaCode,
	FaBriefcase,
	FaUserGraduate,
	FaHandshake,
	FaComments,
	FaStar
} from "react-icons/fa";

export default function About() {
	return (
		<div className="min-h-screen bg-white px-4 py-12 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-4xl">
				{/* Hero Header */}
				<div className="text-center mb-12">
					<span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-slate-100 text-gray-700 rounded-full mb-3">
						Our Mission
					</span>
					<h1 className="text-3xl sm:text-5xl font-bold text-black tracking-tight">
						Built for early-career developers to get real-world experience.
					</h1>
					<p className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
						Freelance Dev is a friendly marketplace created to bridge the gap
						between learning to code and landing real freelance projects.
					</p>
				</div>

				{/* The Purpose / Problem Section */}
				<div className="rounded-2xl border border-gray-200 bg-slate-50/60 p-6 sm:p-8 mb-10">
					<h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
						Why does Freelance Dev exist?
					</h2>
					<p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-4">
						Breaking into freelancing as a junior or self-taught developer is
						tough. Mainstream platforms are crowded, competitive, and often
						require years of previous reviews just to get noticed for basic
						tasks.
					</p>
					<p className="text-gray-700 leading-relaxed text-sm sm:text-base">
						Freelance Dev focuses on{" "}
						<strong>beginner-friendly, bite-sized projects</strong> where
						clients can find enthusiastic developers ready to help, and
						developers can build their portfolios, collect honest reviews, and
						gain real client-facing confidence.
					</p>
				</div>

				{/* What We Hope to Accomplish (Pillars) */}
				<div className="mb-12">
					<h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center sm:text-left">
						What we’re here to accomplish
					</h2>
					<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
						<div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:border-gray-300 transition">
							<div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-gray-800 mb-3">
								<FaUserGraduate size={20} />
							</div>
							<h3 className="font-semibold text-gray-900 mb-1">
								Accessible Opportunities
							</h3>
							<p className="text-sm text-gray-600 leading-relaxed">
								Listing tasks tailored for beginners so you don't need 5+ years
								of experience to land your first gig.
							</p>
						</div>

						<div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:border-gray-300 transition">
							<div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-gray-800 mb-3">
								<FaCode size={20} />
							</div>
							<h3 className="font-semibold text-gray-900 mb-1">
								Proof of Skills
							</h3>
							<p className="text-sm text-gray-600 leading-relaxed">
								Highlight your GitHub contributions, project links, and live
								demos directly on your freelancer profile.
							</p>
						</div>

						<div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:border-gray-300 transition">
							<div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-gray-800 mb-3">
								<FaStar size={18} />
							</div>
							<h3 className="font-semibold text-gray-900 mb-1">
								Public Track Record
							</h3>
							<p className="text-sm text-gray-600 leading-relaxed">
								Earn verified reviews and star ratings to demonstrate
								credibility to future clients and full-time employers.
							</p>
						</div>

						<div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:border-gray-300 transition">
							<div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-gray-800 mb-3">
								<FaHandshake size={20} />
							</div>
							<h3 className="font-semibold text-gray-900 mb-1">
								Win-Win for Clients
							</h3>
							<p className="text-sm text-gray-600 leading-relaxed">
								Affordable, motivated developer talent for small businesses,
								startups, and creators needing simple tech help.
							</p>
						</div>

						<div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:border-gray-300 transition">
							<div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-gray-800 mb-3">
								<FaComments size={20} />
							</div>
							<h3 className="font-semibold text-gray-900 mb-1">
								Simple Direct Chat
							</h3>
							<p className="text-sm text-gray-600 leading-relaxed">
								Built-in messaging allows clients and developers to align on
								scope, ask questions, and share progress quickly.
							</p>
						</div>

						<div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:border-gray-300 transition">
							<div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-gray-800 mb-3">
								<FaBriefcase size={18} />
							</div>
							<h3 className="font-semibold text-gray-900 mb-1">
								Portfolio Growth
							</h3>
							<p className="text-sm text-gray-600 leading-relaxed">
								Every finished project is a real portfolio piece and a stepping
								stone toward a full-time tech career.
							</p>
						</div>
					</div>
				</div>

				{/* How It Works */}
				<div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 mb-12 shadow-sm">
					<h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
						How it works
					</h2>
					<div className="grid gap-6 sm:grid-cols-3">
						<div className="space-y-2">
							<span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-sm font-bold text-white">
								1
							</span>
							<h3 className="font-semibold text-gray-900">Post or Browse</h3>
							<p className="text-sm text-gray-600 leading-relaxed">
								Clients post accessible project briefs with clear deliverables.
								Developers browse tasks that match their skill level.
							</p>
						</div>

						<div className="space-y-2">
							<span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-sm font-bold text-white">
								2
							</span>
							<h3 className="font-semibold text-gray-900">Connect & Build</h3>
							<p className="text-sm text-gray-600 leading-relaxed">
								Submit proposals, discuss the details via inbox messaging, and
								work together to deliver the project.
							</p>
						</div>

						<div className="space-y-2">
							<span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-sm font-bold text-white">
								3
							</span>
							<h3 className="font-semibold text-gray-900">Review & Grow</h3>
							<p className="text-sm text-gray-600 leading-relaxed">
								Complete the job, receive your rating and client review, and add
								the experience straight to your resume.
							</p>
						</div>
					</div>
				</div>

				{/* Call to action */}
				<div className="rounded-2xl bg-black text-white p-8 text-center sm:p-10">
					<h2 className="text-2xl sm:text-3xl font-bold mb-3">
						Ready to get started?
					</h2>
					<p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto mb-6">
						Whether you're hiring for your next idea or looking to take on your
						very first client project, we'd love to have you.
					</p>
					<div className="flex flex-col sm:flex-row items-center justify-center gap-3">
						<Link
							to="/join"
							className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white text-black font-semibold text-sm hover:bg-gray-100 transition"
						>
							Join Freelance Dev
						</Link>
						<Link
							to="/listings"
							className="w-full sm:w-auto px-6 py-3 rounded-xl border border-gray-700 text-white font-semibold text-sm hover:bg-gray-900 transition"
						>
							Explore Listings
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
