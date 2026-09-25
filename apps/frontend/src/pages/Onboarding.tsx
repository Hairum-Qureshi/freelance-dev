import { useState } from "react";
import type { OnboardingData } from "@repo/shared-types";
import useUser from "../hooks/useUser";

export default function Onboarding() {
	const [currStep, setCurrStep] = useState(0);
	const [onboardingData, setOnboardData] = useState<OnboardingData>({
		role: null
	});
	const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
	const { onboardingMutation } = useUser();

	const steps: {
		id: number;
		title: string;
		multiSelect: boolean;
		options: { text: string; nextText: number; onClick?: () => void }[];
		onClick?: () => void;
	}[] = [
		{
			id: 1,
			title: "Are you looking to hire or work as a freelancer?",
			multiSelect: false,
			options: [
				{
					text: "Hire",
					nextText: 2,
					onClick: () => setOnboardData({ ...onboardingData, role: "hirer" })
				},
				{
					text: "Work",
					nextText: 4,
					onClick: () =>
						setOnboardData({ ...onboardingData, role: "freelancer" })
				}
			]
		},
		{
			id: 2,
			title: "What is your title? You can change this later.",
			multiSelect: false,
			options: [
				{
					text: "Project Manager",
					nextText: 3,
					onClick: () =>
						setOnboardData({ ...onboardingData, hirerTitle: "Project Manager" })
				},
				{
					text: "Startup Founder",
					nextText: 3,
					onClick: () =>
						setOnboardData({ ...onboardingData, hirerTitle: "Startup Founder" })
				},
				{
					text: "CTO",
					nextText: 3,
					onClick: () =>
						setOnboardData({ ...onboardingData, hirerTitle: "CTO" })
				},
				{
					text: "Contractor",
					nextText: 3,
					onClick: () =>
						setOnboardData({ ...onboardingData, hirerTitle: "Contractor" })
				},
				{
					text: "Agency Owner",
					nextText: 3,
					onClick: () =>
						setOnboardData({ ...onboardingData, hirerTitle: "Agency Owner" })
				}
			]
		},
		{
			id: 3,
			title: "What is your budget for hiring a freelancer?",
			multiSelect: false,
			options: [
				{
					text: "$5 - $500",
					nextText: 9,
					onClick: () =>
						setOnboardData({ ...onboardingData, budget: "$5 - $500" })
				},
				{
					text: "$500 - $1,000",
					nextText: 9,
					onClick: () =>
						setOnboardData({ ...onboardingData, budget: "$500 - $1,000" })
				},
				{
					text: "$1,000 - $5,000",
					nextText: 9,
					onClick: () =>
						setOnboardData({ ...onboardingData, budget: "$1,000 - $5,000" })
				},
				{
					text: "$5,000+",
					nextText: 9,
					onClick: () =>
						setOnboardData({ ...onboardingData, budget: "$5,000+" })
				}
			]
		},
		{
			id: 4,
			title: "What work are you interested in? (Select all that apply)",
			multiSelect: true,
			options: [
				{ text: "Mobile Development", nextText: 5 },
				{ text: "Frontend Development", nextText: 5 },
				{ text: "Backend Development", nextText: 5 },
				{ text: "Full-stack Development", nextText: 5 },
				{ text: "UI/UX Design", nextText: 5 },
				{ text: "Bug Fixing", nextText: 5 },
				{ text: "Performance Optimization", nextText: 5 },
				{ text: "API Integration", nextText: 5 }
			]
		},
		{
			id: 5,
			title:
				"What kind of projects are you looking for? (Select all that apply)",
			multiSelect: true,
			options: [
				{ text: "Landing Pages", nextText: 6 },
				{ text: "Business Websites", nextText: 6 },
				{ text: "E-commerce Sites", nextText: 6 },
				{ text: "Web Applications", nextText: 6 },
				{ text: "Mobile Applications", nextText: 6 },
				{ text: "Dashboard / Admin Panels", nextText: 6 },
				{ text: "Bug Fixes", nextText: 6 },
				{ text: "Website Redesigns", nextText: 6 },
				{ text: "API / Backend Projects", nextText: 6 }
			]
		},
		{
			id: 6,
			title: "What's your experience level?",
			multiSelect: false,
			options: [
				{
					text: "Just getting started",
					nextText: 7,
					onClick: () =>
						setOnboardData({
							...onboardingData,
							experience: "Just getting started"
						})
				},
				{
					text: "Learning and building projects",
					nextText: 7,
					onClick: () =>
						setOnboardData({
							...onboardingData,
							experience: "Learning and building projects"
						})
				},
				{
					text: "I've completed a few projects",
					nextText: 7,
					onClick: () =>
						setOnboardData({
							...onboardingData,
							experience: "I've completed a few projects"
						})
				},
				{
					text: "I've done freelance or professional work",
					nextText: 7,
					onClick: () =>
						setOnboardData({
							...onboardingData,
							experience: "I've done freelance or professional work"
						})
				},
				{
					text: "Experienced developer",
					nextText: 7,
					onClick: () =>
						setOnboardData({
							...onboardingData,
							experience: "Experienced developer"
						})
				}
			]
		},
		{
			id: 7,
			title: "What are you hoping to accomplish?",
			multiSelect: true,
			options: [
				{
					text: "Build my portfolio",
					nextText: 8,
					onClick: () =>
						setOnboardData({
							...onboardingData,
							hopes: [...(onboardingData.hopes || []), "Build my portfolio"]
						})
				},
				{
					text: "Get my first client",
					nextText: 8,
					onClick: () =>
						setOnboardData({
							...onboardingData,
							hopes: [...(onboardingData.hopes || []), "Get my first client"]
						})
				},
				{
					text: "Gain real-world experience",
					nextText: 8,
					onClick: () =>
						setOnboardData({
							...onboardingData,
							hopes: [
								...(onboardingData.hopes || []),
								"Gain real-world experience"
							]
						})
				},
				{
					text: "Earn extra income",
					nextText: 8,
					onClick: () =>
						setOnboardData({
							...onboardingData,
							hopes: [...(onboardingData.hopes || []), "Earn extra income"]
						})
				},
				{
					text: "Find long-term clients",
					nextText: 8,
					onClick: () =>
						setOnboardData({
							...onboardingData,
							hopes: [...(onboardingData.hopes || []), "Find long-term clients"]
						})
				}
			]
		},
		{
			id: 8,
			title:
				"Which technologies do you work with? Select all that apply. You can add more later.",
			multiSelect: true,
			options: [
				{ text: "JavaScript", nextText: 10 },
				{ text: "TypeScript", nextText: 10 },
				{ text: "Python", nextText: 10 },
				{ text: "Java", nextText: 10 },
				{ text: "C#", nextText: 10 },
				{ text: "C++", nextText: 10 },
				{ text: "C", nextText: 10 },
				{ text: "Go", nextText: 10 },
				{ text: "Rust", nextText: 10 },
				{ text: "PHP", nextText: 10 },
				{ text: "Ruby", nextText: 10 },
				{ text: "Kotlin", nextText: 10 },
				{ text: "Swift", nextText: 10 },
				{ text: "React", nextText: 10 },
				{ text: "Next.js", nextText: 10 },
				{ text: "Vue", nextText: 10 },
				{ text: "Angular", nextText: 10 },
				{ text: "Svelte", nextText: 10 },
				{ text: "Node.js", nextText: 10 },
				{ text: "React Native", nextText: 10 },
				{ text: "Flutter", nextText: 10 },
				{ text: "AWS", nextText: 10 },
				{ text: "Docker", nextText: 10 },
				{ text: "Kubernetes", nextText: 10 }
			]
		},
		{
			id: 9,
			title:
				"What are you looking to hire a freelancer for? (Select all that apply)",
			multiSelect: true,
			options: [
				{ text: "Landing Page", nextText: 10 },
				{ text: "Business Website", nextText: 10 },
				{ text: "E-commerce Site", nextText: 10 },
				{ text: "Web Application", nextText: 10 },
				{ text: "Mobile Application", nextText: 10 },
				{ text: "Dashboard / Admin Panel", nextText: 10 },
				{ text: "Bug Fixes", nextText: 10 },
				{ text: "Website Redesign", nextText: 10 },
				{ text: "API / Backend Work", nextText: 10 },
				{ text: "Performance Optimization", nextText: 10 }
			]
		},
		{
			id: 10,
			title: "How quickly do you typically respond?",
			multiSelect: false,
			options: [
				{
					text: "Within 1 hour",
					nextText: 11,
					onClick: () =>
						setOnboardData({ ...onboardingData, responseTime: "Within 1 hour" })
				},
				{
					text: "Within 24 hours",
					nextText: 11,
					onClick: () =>
						setOnboardData({
							...onboardingData,
							responseTime: "Within 24 hours"
						})
				},
				{
					text: "Within 3 days",
					nextText: 11,
					onClick: () =>
						setOnboardData({ ...onboardingData, responseTime: "Within 3 days" })
				},
				{
					text: "Within a week",
					nextText: 11,
					onClick: () =>
						setOnboardData({ ...onboardingData, responseTime: "Within a week" })
				}
			]
		},
		{
			id: 11,
			title: "You're all set!",
			multiSelect: false,
			options: [{ text: "View Profile", nextText: -1 }],
			onClick: () =>
				setOnboardData({
					...onboardingData
				})
		}
	];

	const step = steps[currStep];

	const toggleOption = (option: string) => {
		setSelectedOptions(currentOptions =>
			currentOptions.includes(option)
				? currentOptions.filter(currentOption => currentOption !== option)
				: [...currentOptions, option]
		);
	};

	const goToNextStep = () => {
		setOnboardData(currentData => {
			switch (step.id) {
				case 4:
					return { ...currentData, interests: selectedOptions };
				case 5:
					return { ...currentData, seekingProjects: selectedOptions };
				case 7:
					return { ...currentData, hopes: selectedOptions };
				case 8:
					return { ...currentData, technologies: selectedOptions };
				case 9:
					return { ...currentData, hiringFor: selectedOptions };
				default:
					return currentData;
			}
		});

		setSelectedOptions([]);
		setCurrStep(step.options[0].nextText - 1);
	};

	return (
		<div className="relative h-screen flex items-center justify-center">
			<div className="absolute top-8 left-1/2 w-full max-w-2xl -translate-x-1/2 px-6">
				<div className="h-4 w-full overflow-hidden rounded-sm bg-gray-200">
					<div
						className="bg-black h-full transition-all duration-300"
						style={{
							width: `${((currStep + 1) / steps.length) * 100}%`
						}}
					/>
				</div>
			</div>

			{/* Question */}
			<div className="w-full max-w-2xl px-6 text-center">
				{[step].map(step => {
					return (
						<>
							<h3 className="text-2xl font-medium">{step.title}</h3>

							<div className="mt-4 flex flex-wrap justify-center gap-4">
								{step.options.map(option =>
									step.multiSelect ? (
										<div key={option.text}>
											<label className="flex items-center gap-2">
												<input
													type="checkbox"
													className="h-4 w-4"
													checked={selectedOptions.includes(option.text)}
													onChange={() => toggleOption(option.text)}
												/>
												{option.text}
											</label>
										</div>
									) : (
										step.id !== 11 && (
											<button
												key={option.text}
												type="button"
												className="min-w-48 rounded-lg bg-black px-6 py-2 text-center text-white transition-colors hover:cursor-pointer hover:bg-gray-800"
												onClick={() => {
													option.onClick?.();
													setCurrStep(option.nextText - 1);
												}}
											>
												{option.text}
											</button>
										)
									)
								)}

								{step.multiSelect && (
									<div className="w-full mt-4 flex justify-center">
										<button
											type="button"
											className="w-48 rounded-lg bg-black px-4 py-2 text-white transition-colors hover:bg-gray-800 hover:cursor-pointer"
											onClick={goToNextStep}
										>
											Next
										</button>
									</div>
								)}
								{step.id === 11 && (
									<div className="w-full mt-4 flex justify-center">
										<button
											type="button"
											className="w-48 rounded-lg bg-black px-4 py-2 text-white transition-colors hover:bg-gray-800 hover:cursor-pointer"
											onClick={() => {
												step.onClick?.();
												onboardingMutation.mutate({ onboardingData });
											}}
										>
											Go to Profile
										</button>
									</div>
								)}
							</div>
						</>
					);
				})}
			</div>
		</div>
	);
}
