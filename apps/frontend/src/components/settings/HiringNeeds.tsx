import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { FormEvent } from "react";
import type { OnboardingData } from "@repo/shared-types";
import { useCurrentUser } from "../../hooks/useCurrentUser";

const inputClassName =
	"mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm";

export default function HiringNeeds() {
	const { data: currentUser } = useCurrentUser();
	const queryClient = useQueryClient();
	const onboardingAnswers = currentUser?.onboardingAnswers;
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

	const saveAnswers = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		saveOnboardingAnswers.mutate({
			...onboardingAnswers,
			role: currentUser?.role ?? null,
			hirerTitle: String(formData.get("hirerTitle") ?? ""),
			budget: String(formData.get("budget") ?? ""),
			hiringFor: String(formData.get("hiringFor") ?? "")
				.split(",")
				.map(item => item.trim())
				.filter(Boolean)
		});
	};

	return (
		<form onSubmit={saveAnswers}>
			<h2 className="text-xl font-semibold text-gray-900">Hiring needs</h2>
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
			<label className="mt-4 block text-sm font-medium text-gray-700">
				Project requirements
				<textarea
					name="hiringFor"
					className={`${inputClassName} min-h-28 resize-y`}
					defaultValue={onboardingAnswers?.hiringFor?.join(", ") ?? ""}
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
	);
}
