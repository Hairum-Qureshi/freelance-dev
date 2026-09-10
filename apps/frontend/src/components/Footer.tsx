import { Link } from "react-router-dom";
import freelanceDevLogo from "../assets/freelance-dev-logo.jpeg";

export default function Footer() {
	return (
		<footer className="w-full border-t border-slate-200 bg-slate-100/80 text-slate-700">
			<div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10 md:px-8">
				<div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
					<div className="max-w-sm">
						<div className="flex items-center gap-3">
							<img
								src={freelanceDevLogo}
								alt="Freelance Dev Logo"
								className="h-20 w-20 rounded-md object-cover"
							/>
							<p className="text-xl font-semibold tracking-tight text-slate-900">
								Freelance Dev
							</p>
						</div>
						<p className="mt-3 text-sm leading-6 text-slate-600">
							Helping businesses grow with practical digital solutions, reliable
							partnership, and execution that moves the needle.
						</p>
					</div>

					<div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
						<div>
							<p className="text-sm font-semibold uppercase tracking-[0.08em] text-slate-900">
								Company
							</p>
							<ul className="mt-3 space-y-2 text-sm">
								<li>
									<Link
										to="/about"
										className="transition hover:text-slate-900 hover:underline"
									>
										About
									</Link>
								</li>
								<li>
									<Link
										to="/contact"
										className="transition hover:text-slate-900 hover:underline"
									>
										Contact
									</Link>
								</li>
								<li>
									<Link
										to="/services"
										className="transition hover:text-slate-900 hover:underline"
									>
										Services
									</Link>
								</li>
							</ul>
						</div>

						<div>
							<p className="text-sm font-semibold uppercase tracking-[0.08em] text-slate-900">
								Resources
							</p>
							<ul className="mt-3 space-y-2 text-sm">
								<li>
									<Link
										to="/privacy-policy"
										className="transition hover:text-slate-900 hover:underline"
									>
										Privacy Policy
									</Link>
								</li>
								<li>
									<Link
										to="/terms-of-service"
										className="transition hover:text-slate-900 hover:underline"
									>
										Terms of Service
									</Link>
								</li>
							</ul>
						</div>

						<div>
							<p className="text-sm font-semibold uppercase tracking-[0.08em] text-slate-900">
								Contact
							</p>
							<ul className="mt-3 space-y-2 text-sm">
								<li>hello@freelancedev.com</li>
								<li>+1 (555) 123-4567</li>
								<li>New York, NY</li>
							</ul>
						</div>
					</div>
				</div>

				<div className="flex flex-col gap-2 border-t border-slate-200 pt-5 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
					<p>&copy; 2026 Freelance Dev. All rights reserved.</p>
					<p>Built for entry-level developers.</p>
				</div>
			</div>
		</footer>
	);
}
