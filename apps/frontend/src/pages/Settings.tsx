import { useState, type FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { FaArrowLeftLong } from "react-icons/fa6";

import { useCurrentUser } from "../hooks/useCurrentUser";
import type { OnboardingData } from "@repo/shared-types";
import PillInput from "../components/PillInput";
import { Link } from "react-router-dom";

export default function Settings() {
	const [activeSection, setActiveSection] = useState("profile");

	const { data: currentUser } = useCurrentUser();
	const queryClient = useQueryClient();

	const onboardingAnswers = currentUser?.onboardingAnswers;
	const skills = onboardingAnswers?.technologies ?? [];

	const isWorker = onboardingAnswers?.role === "Work";

	const inputClassName =
		"mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm";

	// Save onboarding information
	const saveOnboardingAnswers = useMutation({
		mutationFn: async (data: OnboardingData) => {
			await axios.post(
				`${import.meta.env.VITE_BACKEND_URL}/api/user/onboarding/answers`,
				data,
				{
					withCredentials: true
				}
			);
		},

		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["currentUser"]
			});
		}
	});

	// Turn a comma-separated form value into an array
	const getList = (formData: FormData, fieldName: string) => {
		const value = String(formData.get(fieldName) ?? "");

		return value
			.split(",")
			.map(item => item.trim())
			.filter(item => item.length > 0);
	};

	// Save the onboarding form
	const saveAnswers = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);

		const updatedAnswers: OnboardingData = {
			...onboardingAnswers,

			role:
				(formData.get("role") as "Hire" | "Work") ?? onboardingAnswers?.role,

			hirerTitle: String(
				formData.get("hirerTitle") ?? onboardingAnswers?.hirerTitle ?? ""
			),

			budget: String(formData.get("budget") ?? onboardingAnswers?.budget ?? ""),

			hiringFor: formData.has("hiringFor")
				? getList(formData, "hiringFor")
				: onboardingAnswers?.hiringFor,

			interests: formData.has("interests")
				? getList(formData, "interests")
				: onboardingAnswers?.interests,

			seekingProjects: formData.has("seekingProjects")
				? getList(formData, "seekingProjects")
				: onboardingAnswers?.seekingProjects,

			experience: String(
				formData.get("experience") ?? onboardingAnswers?.experience ?? ""
			),

			hopes: formData.has("hopes")
				? getList(formData, "hopes")
				: onboardingAnswers?.hopes,

			technologies: formData.has("technologies")
				? getList(formData, "technologies")
				: onboardingAnswers?.technologies,

			responseTime: String(
				formData.get("responseTime") ?? onboardingAnswers?.responseTime ?? ""
			)
		};

		saveOnboardingAnswers.mutate(updatedAnswers);
	};

	// Settings menu items
	const sections = [
		{
			id: "profile",
			label: "Profile details",
			description: "Photo, name, email and bio"
		},
		{
			id: isWorker ? "work" : "hiring",
			label: isWorker ? "Work profile" : "Hiring needs",
			description: isWorker
				? "Services, skills and goals"
				: "Budget and project requirements"
		},
		{
			id: "availability",
			label: "Availability",
			description: "Response time and platform role"
		},
		{
			id: "payments",
			label: "Payments",
			description: isWorker
				? "Payouts and earnings"
				: "Payment methods and billing"
		}
	];

	return (
		<div className="min-h-screen bg-gray-50 px-4 py-6">
			<div className="mx-auto max-w-5xl">
				{/* Back to profile */}
				<Link
					to={`/p/${currentUser?.id}`}
					className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
				>
					<FaArrowLeftLong className="text-sm" />
					Go back to profile
				</Link>

				{/* Page heading */}
				<div className="mb-6">
					<h1 className="text-3xl font-semibold text-gray-900">Settings</h1>

					<p className="mt-1 text-sm text-gray-500">
						Manage the information shown on your profile.
					</p>
				</div>

				{/* Settings layout */}
				<div className="grid grid-cols-1 gap-5 md:grid-cols-3">
					{/* Sidebar */}
					<aside className="h-fit rounded-md border border-gray-300 bg-white p-3 shadow-sm">
						<nav aria-label="Settings sections">
							{sections.map(section => {
								const isActive = activeSection === section.id;

								return (
									<button
										key={section.id}
										type="button"
										onClick={() => setActiveSection(section.id)}
										className={`mb-1 w-full rounded-md px-3 py-3 text-left ${
											isActive
												? "bg-gray-900 text-white"
												: "text-gray-700 hover:bg-gray-100"
										}`}
									>
										<span className="block text-sm font-medium">
											{section.label}
										</span>

										<span
											className={`mt-1 block text-xs ${
												isActive ? "text-gray-300" : "text-gray-500"
											}`}
										>
											{section.description}
										</span>
									</button>
								);
							})}
						</nav>
					</aside>

					{/* Main content */}
					<main className="rounded-md border border-gray-300 bg-white p-5 shadow-sm md:col-span-2">
						{/* PROFILE */}
						{activeSection === "profile" && (
							<section>
								<h2 className="text-xl font-semibold text-gray-900">
									Profile details
								</h2>

								<p className="mt-1 text-sm text-gray-500">
									Update your public profile information.
								</p>

								{/* Profile picture */}
								<div className="mt-6 flex items-center gap-4">
									<img
										src={currentUser?.profilePicture}
										alt="Profile"
										className="h-16 w-16 rounded-full border border-gray-200 object-cover"
										referrerPolicy="no-referrer"
									/>

									<button
										type="button"
										className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
									>
										Change photo
									</button>
								</div>

								{/* Name */}
								<div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
									<label className="text-sm font-medium text-gray-700">
										First name
										<input
											type="text"
											className={inputClassName}
											defaultValue={currentUser?.firstName}
										/>
									</label>

									<label className="text-sm font-medium text-gray-700">
										Last name
										<input
											type="text"
											className={inputClassName}
											defaultValue={currentUser?.lastName}
										/>
									</label>
								</div>

								{/* Email */}
								<label className="mt-4 block text-sm font-medium text-gray-700">
									Email
									<input
										type="email"
										className={`${inputClassName} bg-gray-100 text-gray-500`}
										defaultValue={currentUser?.email}
										disabled
									/>
								</label>

								{/* Bio */}
								<label className="mt-4 block text-sm font-medium text-gray-700">
									Bio
									<textarea
										className={`${inputClassName} min-h-28 resize-y`}
										placeholder="Tell people a little about yourself."
									/>
								</label>

								{/* Location */}
								<label className="mt-4 block text-sm font-medium text-gray-700">
									Location
									<input
										type="text"
										className={`${inputClassName} text-gray-500`}
										defaultValue={currentUser?.location}
									/>
								</label>

								<button
									type="button"
									className="mt-6 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
								>
									Save profile
								</button>
							</section>
						)}

						{/* WORK PROFILE */}
						{activeSection === "work" && isWorker && (
							<form onSubmit={saveAnswers}>
								<h2 className="text-xl font-semibold text-gray-900">
									Work profile
								</h2>

								<p className="mt-1 text-sm text-gray-500">
									Update the work you offer and your professional goals.
								</p>

								{/* Current skills */}
								<div className="mt-6">
									<div className="flex flex-wrap gap-2">
										{skills.length > 0 ? (
											skills.map((skill: string) => (
												<span
													key={skill}
													className="rounded-full bg-gray-900 px-3 py-1.5 text-sm text-white"
												>
													{skill}
												</span>
											))
										) : (
											<p className="text-sm text-gray-500">
												No skills added yet.
											</p>
										)}
									</div>
								</div>

								<PillInput
									key={`technologies-${skills.join("-")}`}
									label="Skills and tools"
									name="technologies"
									initialValues={skills}
									placeholder="Add a skill and press Enter"
								/>

								<PillInput
									key={`interests-${(onboardingAnswers?.interests ?? []).join(
										"-"
									)}`}
									label="Services you offer"
									name="interests"
									initialValues={onboardingAnswers?.interests ?? []}
									placeholder="Add a service and press Enter"
								/>

								<PillInput
									key={`projects-${(
										onboardingAnswers?.seekingProjects ?? []
									).join("-")}`}
									label="Projects you want"
									name="seekingProjects"
									initialValues={onboardingAnswers?.seekingProjects ?? []}
									placeholder="Add a project type and press Enter"
								/>

								{/* Experience */}
								<label className="mt-4 block text-sm font-medium text-gray-700">
									Experience
									<select
										name="experience"
										className={inputClassName}
										defaultValue={onboardingAnswers?.experience ?? ""}
									>
										<option value="">Select experience</option>
										<option>Just getting started</option>
										<option>Learning and building projects</option>
										<option>I've completed a few projects</option>
										<option>I've done freelance or professional work</option>
										<option>Experienced developer</option>
									</select>
								</label>

								<PillInput
									key={`hopes-${(onboardingAnswers?.hopes ?? []).join("-")}`}
									label="Goals"
									name="hopes"
									initialValues={onboardingAnswers?.hopes ?? []}
									placeholder="Add a goal and press Enter"
								/>

								<button
									type="submit"
									className="mt-4 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
								>
									Save work profile
								</button>
							</form>
						)}

						{/* AVAILABILITY */}
						{activeSection === "availability" && (
							<form onSubmit={saveAnswers}>
								<h2 className="text-xl font-semibold text-gray-900">
									Role and availability
								</h2>

								<p className="mt-1 text-sm text-gray-500">
									Set how you want to use the platform.
								</p>

								{/* Role */}
								<div className="mt-6 space-y-3">
									<label className="flex items-center gap-3 rounded-md border border-gray-300 p-4">
										<input
											type="radio"
											name="role"
											value="Work"
											defaultChecked={isWorker}
										/>

										<span>
											<span className="block font-medium text-gray-900">
												Work as a freelancer
											</span>

											<span className="text-sm text-gray-500">
												Show your skills and past work.
											</span>
										</span>
									</label>

									<label className="flex items-center gap-3 rounded-md border border-gray-300 p-4">
										<input
											type="radio"
											name="role"
											value="Hire"
											defaultChecked={!isWorker}
										/>

										<span>
											<span className="block font-medium text-gray-900">
												Hire a freelancer
											</span>

											<span className="text-sm text-gray-500">
												Share the work you need completed.
											</span>
										</span>
									</label>
								</div>

								{/* Response time */}
								<label className="mt-5 block text-sm font-medium text-gray-700">
									Response time
									<select
										name="responseTime"
										className={inputClassName}
										defaultValue={onboardingAnswers?.responseTime ?? ""}
									>
										<option value="">Select response time</option>
										<option>Within 1 hour</option>
										<option>Within 24 hours</option>
										<option>Within 3 days</option>
										<option>Within a week</option>
									</select>
								</label>

								<button
									type="submit"
									className="mt-6 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
								>
									Save availability
								</button>
							</form>
						)}

						{/* HIRING */}
						{activeSection === "hiring" && !isWorker && (
							<form onSubmit={saveAnswers}>
								<h2 className="text-xl font-semibold text-gray-900">
									Hiring needs
								</h2>

								<p className="mt-1 text-sm text-gray-500">
									Set your title, budget, and the work you need completed.
								</p>

								<label className="mt-6 block text-sm font-medium text-gray-700">
									Your title
									<input
										name="hirerTitle"
										type="text"
										className={inputClassName}
										defaultValue={onboardingAnswers?.hirerTitle ?? ""}
										placeholder="e.g. Project Manager"
									/>
								</label>

								{/* Budget */}
								<label className="mt-4 block text-sm font-medium text-gray-700">
									Pay scale
									<select
										name="budget"
										className={inputClassName}
										defaultValue={onboardingAnswers?.budget ?? ""}
									>
										<option value="">Select a budget</option>
										<option>$5 - $500</option>
										<option>$500 - $1,000</option>
										<option>$1,000 - $5,000</option>
										<option>$5,000+</option>
									</select>
								</label>

								{/* Project requirements */}
								<label className="mt-4 block text-sm font-medium text-gray-700">
									Project requirements
									<textarea
										name="hiringFor"
										className={`${inputClassName} min-h-28 resize-y`}
										defaultValue={
											onboardingAnswers?.hiringFor?.join(", ") ?? ""
										}
										placeholder="e.g. React website, MongoDB database, user authentication"
									/>
									<span className="mt-1 block text-xs text-gray-500">
										Separate each requirement with a comma.
									</span>
								</label>

								<button
									type="submit"
									className="mt-6 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
								>
									Save hiring needs
								</button>
							</form>
						)}

						{/* PAYMENTS */}
						{activeSection === "payments" && (
							<section>
								<h2 className="text-xl font-semibold text-gray-900">
									Payments
								</h2>

								<p className="mt-1 text-sm text-gray-500">
									{isWorker
										? "Set up your payout information to receive earnings from clients."
										: "Manage the payment methods you use to pay freelancers."}
								</p>

								{isWorker ? (
									<>
										{/* Payout status */}
										<div className="mt-6 rounded-md border border-gray-300 p-4">
											<div className="flex items-start justify-between gap-4">
												<div>
													<h3 className="font-medium text-gray-900">
														Payout status
													</h3>

													<p className="mt-1 text-sm text-gray-500">
														Your Stripe account is not connected yet.
													</p>
												</div>

												<span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
													Not connected
												</span>
											</div>
										</div>

										{/* Payout information */}
										<div className="mt-5">
											<h3 className="font-medium text-gray-900">
												Receive payments
											</h3>

											<p className="mt-1 text-sm text-gray-500">
												Connect a Stripe account to receive payments from
												clients for completed work.
											</p>

											<div className="mt-4 rounded-md bg-gray-50 p-4">
												<p className="text-sm text-gray-600">
													Stripe will securely collect the information required
													to verify your identity and set up payouts.
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
												// TODO: Replace with Stripe Connect onboarding
												onClick={() => {
													console.log("Start Stripe Connect onboarding");
												}}
											>
												Set up payouts
											</button>
										</div>
									</>
								) : (
									<>
										{/* Client payment methods */}
										<div className="mt-6">
											<h3 className="font-medium text-gray-900">
												Payment methods
											</h3>

											<p className="mt-1 text-sm text-gray-500">
												Add a payment method to pay freelancers for completed
												work.
											</p>

											<div className="mt-4 rounded-md border border-dashed border-gray-300 p-6 text-center">
												<p className="text-sm text-gray-500">
													No payment methods added yet.
												</p>

												<button
													type="button"
													className="mt-4 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
													// TODO: Replace with Stripe payment method setup
													onClick={() => {
														console.log("Add Stripe payment method");
													}}
												>
													Add payment method
												</button>
											</div>
										</div>

										{/* Billing information */}
										<div className="mt-6 rounded-md bg-gray-50 p-4">
											<h3 className="font-medium text-gray-900">
												How payments work
											</h3>

											<p className="mt-1 text-sm text-gray-500">
												Your payment information will be securely handled by
												Stripe. Your card details will not be stored directly by
												this platform.
											</p>
										</div>
									</>
								)}
							</section>
						)}
					</main>
				</div>
			</div>
		</div>
	);
}
