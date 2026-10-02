import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { FormEvent } from "react";
import type { OnboardingData } from "@repo/shared-types";
import { useCurrentUser } from "../../hooks/useCurrentUser";

const inputClassName =
	"mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm";

export default function Availability() {
	const { data: currentUser } = useCurrentUser();
	const queryClient = useQueryClient();
	const onboardingAnswers = currentUser?.onboardingAnswers;
	const isWorker = currentUser?.role === "freelancer";

	const saveAnswers = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const updatedAnswers: OnboardingData = {
			...onboardingAnswers,
			role: formData.get("role") as "client" | "freelancer",
			responseTime: String(formData.get("responseTime") ?? "")
		};
		await axios.post(
			`${import.meta.env.VITE_BACKEND_URL}/api/user/onboarding/answers`,
			updatedAnswers,
			{ withCredentials: true }
		);
		await queryClient.invalidateQueries({ queryKey: ["currentUser"] });
	};

	return (
		<form onSubmit={saveAnswers}>
			<h2 className="text-xl font-semibold text-gray-900">
				Role and availability
			</h2>
			<p className="mt-1 text-sm text-gray-500">
				Set how you want to use the platform.
			</p>
			<div className="mt-6 space-y-3">
				<label className="flex items-center gap-3 rounded-md border border-gray-300 p-4">
					<input
						type="radio"
						name="role"
						value="freelancer"
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
						value="client"
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
	);
}
