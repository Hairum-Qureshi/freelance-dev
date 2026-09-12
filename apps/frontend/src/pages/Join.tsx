import { Link } from "react-router-dom";
import freelanceDevLogo from "../assets/freelance-dev-logo.svg";
import GoogleOAuthButton from "../components/GoogleOAuthButton";

export default function Join() {
	return (
		<div className="min-h-screen grid lg:grid-cols-2 bg-slate-50">
			{/* Branding */}
			<div className="relative flex items-center justify-center overflow-hidden bg-black px-8 py-16 text-white">
				<div className="flex max-w-md flex-col items-center text-center">
					<div className="mb-8 rounded-2xl border border-white/10 bg-white p-4">
						<img
							src={freelanceDevLogo}
							alt="Freelance Dev Logo"
							className="h-40 w-40 rounded-xl object-cover"
						/>
					</div>

					<h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
						Freelance Dev
					</h1>

					<p className="mt-4 max-w-sm text-base leading-7 text-zinc-500">
						Start building your freelance journey today.
					</p>
				</div>
			</div>

			{/* Join form */}
			<div className="flex items-center justify-center px-6 py-12 sm:px-10">
				<div className="w-full rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
					<div className="w-full max-w-sm">
						<div className="text-center">
							<h2 className="text-3xl font-bold tracking-tight text-slate-900">
								Join Freelance Dev
							</h2>

							<p className="mt-3 text-sm leading-6 text-slate-500">
								Create your account and start connecting with talented
								developers.
							</p>
						</div>

						<div className="my-4 flex justify-center">
							<GoogleOAuthButton />
						</div>

						<div className="mt-6 text-center">
							<Link
								to="/"
								className="text-sm font-medium text-slate-500 transition hover:text-slate-900"
							>
								← Go back home
							</Link>
						</div>
					</div>

					{/* 
					<form className="mt-8 space-y-5">
						<div>
							<label className="mb-2 block text-sm font-medium text-slate-700">
								First Name
							</label>
							<input
								type="text"
								placeholder="John"
								className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
							/>
						</div>

						<div>
							<label className="mb-2 block text-sm font-medium text-slate-700">
								Last Name
							</label>
							<input
								type="text"
								placeholder="Doe"
								className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
							/>
						</div>

						<div>
							<label className="mb-2 block text-sm font-medium text-slate-700">
								Email
							</label>
							<input
								type="email"
								placeholder="you@example.com"
								className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
							/>
						</div>

						<div>
							<label className="mb-2 block text-sm font-medium text-slate-700">
								Password
							</label>
							<input
								type="password"
								placeholder="••••••••"
								className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
							/>
						</div>

						<button
							type="submit"
							className="w-full rounded-lg bg-slate-950 px-4 py-3 font-medium text-white transition hover:bg-slate-800"
						>
							Create account
						</button>
					</form>

					<p className="mt-6 text-center text-sm text-slate-500">
						Already have an account?{" "}
						<a
							href="#"
							className="font-medium text-indigo-600 hover:text-indigo-500"
						>
							Sign in
						</a>
					</p> */}
				</div>
			</div>
		</div>
	);
}
