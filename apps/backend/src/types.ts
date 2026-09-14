type OnboardingAnswers = {
  role: 'Hire' | 'Work';
  budget?: string;
  hiringFor?: string[];
  interests?: string[];
  seekingProjects?: string[];
  experience?: string;
  hopes?: string[];
  technologies?: string[];
  responseTime?: string;
};

type UserPayload = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  profile_picture: string;
  completed_onboarding: boolean;
  onboarding_answers: OnboardingAnswers;
  resume_url: string;
  deleted: boolean;
  created_at: Date;
  updated_at: Date;
};

type AuthRequest = Request & {
  user?: UserPayload;
};

export type { UserPayload, AuthRequest, OnboardingAnswers };
