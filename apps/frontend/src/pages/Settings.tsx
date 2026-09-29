import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../hooks/useCurrentUser";
import ProfileDetails from "../components/settings/ProfileDetails";
import WorkProfile from "../components/settings/WorkProfile";
import Availability from "../components/settings/Availability";
import Payments from "../components/settings/Payments";
import HiringNeeds from "../components/settings/HiringNeeds";

export default function Settings() {
	const [searchParams] = useSearchParams();
	const [activeSection, setActiveSection] = useState(
		searchParams.get("section") || "profile"
	);
	const { data: currentUser } = useCurrentUser();
	const isWorker = currentUser?.role === "freelancer";
	const navigate = useNavigate();

	const sections = [
		{
			id: "profile",
			label: "Profile details",
			description: "Photo, name, email and bio",
			component: <ProfileDetails />
		},
		{
			id: isWorker ? "work" : "hiring",
			label: isWorker ? "Work profile" : "Hiring needs",
			description: isWorker
				? "Services, skills and goals"
				: "Budget and project requirements",
			component: isWorker ? <WorkProfile /> : <HiringNeeds />
		},
		{
			id: "availability",
			label: "Availability",
			description: "Response time and platform role",
			component: <Availability />
		},
		{
			id: "payments",
			label: "Payments",
			description: isWorker
				? "Payouts and earnings"
				: "Payment methods and billing",
			component: <Payments />
		}
	];

	return (
		<div className="min-h-screen bg-gray-50 px-4 py-6">
			<div className="mx-auto max-w-5xl">
				<Link
					to={`/p/${currentUser?.id}`}
					className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
				>
					<FaArrowLeftLong className="text-sm" />
					Go back to profile
				</Link>

				<div className="mb-6">
					<h1 className="text-3xl font-semibold text-gray-900">Settings</h1>
					<p className="mt-1 text-sm text-gray-500">
						Manage the information shown on your profile.
					</p>
				</div>

				<div className="grid grid-cols-1 gap-5 md:grid-cols-3">
					<aside className="h-fit rounded-md border border-gray-300 bg-white p-3 shadow-sm">
						<nav aria-label="Settings sections">
							{sections.map(section => {
								const isActive = activeSection === section.id;

								return (
									<button
										key={section.id}
										type="button"
										onClick={() => {
											setActiveSection(section.id);
											navigate(`?section=${section.id}`);
										}}
										className={`mb-1 w-full rounded-md px-3 py-3 hover:cursor-pointer text-left ${
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

					<main className="rounded-md border border-gray-300 bg-white p-5 shadow-sm md:col-span-2">
						{sections.find(section => section.id === activeSection)?.component}
					</main>
				</div>
			</div>
		</div>
	);
}
