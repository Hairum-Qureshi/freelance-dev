type OnboardingAnswers = {
  role: 'Hire' | 'Work';
  budget?: string;
  hiringFor?: string[];
  interests?: string[];
  seekingProjects?: string[];
  experience?: string;
  hopes?: string[];
  technologies?: string[];
};

type UserPayload = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string;
  onboardingAnswers: OnboardingAnswers;
  createdAt: Date;
  updatedAt: Date;
};

type AuthRequest = Request & {
  user?: UserPayload;
};

export type { UserPayload, AuthRequest, OnboardingAnswers };
