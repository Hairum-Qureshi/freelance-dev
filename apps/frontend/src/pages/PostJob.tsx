import { useState } from "react";

export default function PostJob() {
	const [skills, setSkills] = useState<string[]>([]);

	return (
		<div className="min-h-screen bg-white px-4 py-8 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-4xl">
				<div className="mb-8">
					<h1 className="mt-4 text-3xl font-bold text-black sm:text-4xl">
						Post a job
					</h1>
					<p className="mt-2 text-sm text-gray-700 sm:text-base">
						Tell us what you need and we'll help you find the right freelance
						talent.
					</p>
				</div>

				<div className="rounded-2xl border border-gray-300 bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.04)] sm:p-8 my-10">
					<form className="space-y-6">
						<div className="grid gap-5 md:grid-cols-2">
							<div className="md:col-span-2">
								<label
									htmlFor="title"
									className="mb-2 block text-sm font-semibold text-gray-800"
								>
									Job title
								</label>
								<input
									id="title"
									type="text"
									placeholder="e.g. Design a simple website for my cafe"
									className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-black placeholder:text-gray-500 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
								/>
							</div>

							<div>
								<label
									htmlFor="company"
									className="mb-2 block text-sm font-semibold text-gray-800"
								>
									Your business name
								</label>
								<input
									id="company"
									type="text"
									placeholder="e.g. Brightlane Studio"
									className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-black placeholder:text-gray-500 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
								/>
							</div>

							<div>
								<label
									htmlFor="category"
									className="mb-2 block text-sm font-semibold text-gray-800"
								>
									Project type
								</label>
								<select
									id="category"
									className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-black outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
								>
									<option value="">Select a project type</option>
									<option value="website">Website / Web App</option>
									<option value="ecommerce">E-commerce</option>
									<option value="mobile-app">Mobile App</option>
									<option value="api-backend">API / Backend</option>
									<option value="database">Database / Data</option>
									<option value="bug-fix">Bug Fix / Troubleshooting</option>
									<option value="feature">New Feature</option>
									<option value="redesign">Website Redesign</option>
									<option value="maintenance">Maintenance / Updates</option>
								</select>
							</div>
						</div>

						<div className="grid gap-5 md:grid-cols-2">
							<div>
								<label
									htmlFor="need"
									className="mb-2 block text-sm font-semibold text-gray-800"
								>
									Looking for
								</label>
								<select
									id="need"
									className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-black outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
								>
									<option value="">Choose the type of help</option>
									<option value="frontend-developer">Frontend Developer</option>
									<option value="backend-developer">Backend Developer</option>
									<option value="fullstack-developer">
										Full-Stack Developer
									</option>
									<option value="mobile-developer">Mobile Developer</option>
									<option value="designer">UI/UX Designer</option>
									<option value="graphic-designer">Graphic Designer</option>
									<option value="wordpress-developer">
										WordPress Developer
									</option>
									<option value="qa-tester">QA / Software Tester</option>
									<option value="data-analyst">Data Analyst</option>
								</select>
							</div>

							<div>
								<label
									htmlFor="experienceLevel"
									className="mb-2 block text-sm font-semibold text-gray-800"
								>
									What experience level are you looking for?
								</label>
								<select
									id="experienceLevel"
									className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-black outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
								>
									<option value="">Select experience level</option>
									<option value="beginner">Beginner / Learning</option>
									<option value="entry">Entry Level</option>
									<option value="intermediate">Intermediate</option>
								</select>
							</div>
							<div>
								<label
									htmlFor="jobType"
									className="mb-2 block text-sm font-semibold text-gray-800"
								>
									Job type
								</label>
								<select
									id="jobType"
									className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-black outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
								>
									<option value="">Select job type</option>
									<option value="freelance">One-time</option>
									<option value="remote">Remote</option>
									<option value="contract">Contract</option>
									<option value="full-time">Full-time</option>
									<option value="part-time">Part-time</option>
								</select>
							</div>
							<div>
								<label
									htmlFor="paymentType"
									className="mb-2 block text-sm font-semibold text-gray-800"
								>
									Payment type
								</label>
								<select
									id="paymentType"
									className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-black outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
								>
									<option value="">Select payment type</option>
									<option value="fixed-price">Fixed price</option>
									<option value="hourly">Hourly rate</option>
								</select>
							</div>
							<div className="md:col-span-2 rounded-xl border border-gray-200 bg-gray-50/60 p-3">
								<div className="grid gap-3 sm:grid-cols-2">
									<div>
										<label
											htmlFor="location"
											className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-600"
										>
											Work location
										</label>
										<select
											id="location"
											className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-black outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
										>
											<option value="">Select location</option>
											<option value="remote">Remote</option>
											<option value="on-site">On-site</option>
											<option value="hybrid">Hybrid</option>
										</select>
									</div>
									<div>
										<label
											htmlFor="region"
											className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-600"
										>
											Region
										</label>
										<select
											id="region"
											className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-black outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
										>
											<option value="">Select region</option>
											<option value="north-america">North America</option>
											<option value="latin-america">Latin America</option>
											<option value="europe">Europe</option>
											<option value="middle-east-africa">
												Middle East &amp; Africa
											</option>
											<option value="asia-pacific">Asia-Pacific</option>
										</select>
									</div>
								</div>
							</div>
							<div className="md:col-span-2">
								<label
									htmlFor="timeline"
									className="mb-2 block text-sm font-semibold text-gray-800"
								>
									Timeline
								</label>
								<select
									id="timeline"
									className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-black outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
								>
									<option value="">When do you need it done?</option>
									<option value="asap">As soon as possible</option>
									<option value="1-2-weeks">Within 1-2 weeks</option>
									<option value="1-month">Within a month</option>
									<option value="2-3-months">Within 2-3 months</option>
									<option value="flexible">Flexible timeline</option>
								</select>
							</div>
						</div>

						<div>
							<label
								htmlFor="description"
								className="mb-2 block text-sm font-semibold text-gray-800"
							>
								Project details
							</label>
							<textarea
								id="description"
								rows={6}
								placeholder="Tell freelancers what you need, what success looks like, and any important details."
								className="w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-black placeholder:text-gray-500 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
							/>
						</div>

						<div>
							<label
								htmlFor="deliverables"
								className="mb-2 block text-sm font-semibold text-gray-800"
							>
								Deliverables
							</label>
							<textarea
								id="deliverables"
								rows={4}
								placeholder="Examples: final website design, copy for 3 landing pages, social media graphics, weekly reporting..."
								className="w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-black placeholder:text-gray-500 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
							/>
						</div>

						<div>
							<label className="mb-2 block text-sm font-semibold text-gray-800">
								Budget range
							</label>
							<div className="grid gap-4 sm:grid-cols-2">
								<div className="relative">
									<span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">
										$
									</span>
									<input
										type="number"
										placeholder="Minimum"
										min={5}
										className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-8 pr-4 text-sm text-black placeholder:text-gray-500 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
									/>
								</div>

								<div className="relative">
									<span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">
										$
									</span>
									<input
										type="number"
										placeholder="Maximum"
										min={5}
										className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-8 pr-4 text-sm text-black placeholder:text-gray-500 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
									/>
								</div>
							</div>
						</div>
						<div>
							<label
								htmlFor="skills"
								className="mb-2 block text-sm font-semibold text-gray-800"
							>
								Skills or experience needed
							</label>
							<div>
								<p className="mb-2 text-xs text-gray-500">
									Use a comma to separate multiple skills.
								</p>
								<input
									id="skills"
									type="text"
									placeholder="e.g. React, WordPress, SEO, branding, UX design"
									value={skills.join(", ")}
									onChange={e =>
										setSkills(
											e.target.value.split(",").map(skill => skill.trim())
										)
									}
									className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-black placeholder:text-gray-500 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
								/>
								{skills.length ? (
									<div className="mt-2 flex flex-wrap gap-2">
										{skills.map(
											(skill, index) =>
												skill && (
													<span
														key={index}
														className="rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-700"
													>
														{skill}
													</span>
												)
										)}
									</div>
								) : null}
							</div>
							{/* <input
								id="skills"
								type="text"
								placeholder="e.g. React, WordPress, SEO, branding, UX design"
								value={skills.join(", ")}
								onChange={e =>
									setSkills(
										e.target.value.split(",").map(skill => skill.trim())
									)
								}
								className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-black placeholder:text-gray-500 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
							/> */}
							<p className="mt-2 text-xs text-gray-500">
								Add the main skills you want the freelancer to have.
							</p>
						</div>

						<div className="rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-700">
							<strong className="font-semibold text-black">Tip:</strong> Keep
							your description clear and specific so the right freelancer can
							respond quickly.
						</div>

						<div className="border-t border-gray-200 pt-2"></div>

						<div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
							<button
								type="button"
								className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
							>
								Save draft
							</button>

							<button
								type="submit"
								className="rounded-xl bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
							>
								Publish job
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
