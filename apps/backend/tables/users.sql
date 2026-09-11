CREATE TABLE users (
    id BIGINT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    email TEXT NOT NULL,
    "profilePicture" TEXT NOT NULL,
    "completedOnboarding" BOOLEAN NOT NULL,
    "onboardingAnswers" JSON,
    "deleted" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,

    CONSTRAINT users_pkey PRIMARY KEY (id)
);