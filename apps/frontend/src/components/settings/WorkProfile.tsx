import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { FormEvent } from "react";
import type { OnboardingData } from "@repo/shared-types";
import PillInput from "../PillInput";
import { useCurrentUser } from "../../hooks/useCurrentUser";

const inputClassName =
	"mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm";

export default function WorkProfile() {
	const { data: currentUser } = useCurrentUser();
	const queryClient = useQueryClient();
	const onboardingAnswers = currentUser?.onboardingAnswers;
	const skills = onboardingAnswers?.technologies ?? [];

	const saveOnboardingAnswers = useMutation({
		mutationFn: async (data: OnboardingData) => {
			await axios.post(
				`${import.meta.env.VITE_BACKEND_URL}/api/user/onboarding/answers`,
				data,
				{ withCredentials: true }
			);
		},
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ["currentUser"] })
	});

	const getList = (formData: FormData, fieldName: string) =>
		String(formData.get(fieldName) ?? "")
			.split(",")
			.map(item => item.trim())
			.filter(item => item.length > 0);

	const saveAnswers = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		saveOnboardingAnswers.mutate({
			...onboardingAnswers,
			role: currentUser?.role ?? null,
			interests: getList(formData, "interests"),
			seekingProjects: getList(formData, "seekingProjects"),
			experience: String(
				formData.get("experience") ?? onboardingAnswers?.experience ?? ""
			),
			hopes: getList(formData, "hopes"),
			technologies: getList(formData, "technologies"),
			responseTime: onboardingAnswers?.responseTime ?? ""
		});
	};

	return (
		<form onSubmit={saveAnswers}>
			<h2 className="text-xl font-semibold text-gray-900">Work profile</h2>
			<p className="mt-1 text-sm text-gray-500">
				Update the work you offer and your professional goals.
			</p>
			<div className="mt-6">
				<div className="flex flex-wrap gap-2">
					{skills.length > 0 ? (
						skills.map(skill => (
							<span
								key={skill}
								className="rounded-full bg-gray-900 px-3 py-1.5 text-sm text-white"
							>
								{skill}
							</span>
						))
					) : (
						<p className="text-sm text-gray-500">No skills added yet.</p>
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
				key={`interests-${(onboardingAnswers?.interests ?? []).join("-")}`}
				label="Services you offer"
				name="interests"
				initialValues={onboardingAnswers?.interests ?? []}
				placeholder="Add a service and press Enter"
			/>
			<PillInput
				key={`projects-${(onboardingAnswers?.seekingProjects ?? []).join("-")}`}
				label="Projects you want"
				name="seekingProjects"
				initialValues={onboardingAnswers?.seekingProjects ?? []}
				placeholder="Add a project type and press Enter"
			/>
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
	);
}
