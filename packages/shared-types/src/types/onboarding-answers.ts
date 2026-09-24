import type { UserRole } from "./user-role.js";

export type OnboardingAnswers = {
	role?: UserRole;
	hirerTitle?: string;
	budget?: string;
	hiringFor?: string[];
	interests?: string[];
	seekingProjects?: string[];
	experience?: string;
	hopes?: string[];
	technologies?: string[];
	responseTime?: string;
};
