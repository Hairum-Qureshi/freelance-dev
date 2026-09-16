export interface OnboardingData {
	role: "Hire" | "Work" | null;
	budget?: string;
	hiringFor?: string[];
	interests?: string[];
	seekingProjects?: string[];
	experience?: string;
	hopes?: string[];
	technologies?: string[];
	responseTime?: string;
}
