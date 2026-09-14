CREATE TABLE users (
    id BIGINT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    profile_picture TEXT NOT NULL,
    completed_onboarding BOOLEAN NOT NULL,
    onboarding_answers JSON,
    deleted BOOLEAN NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL,
    resume_url TEXT,

    CONSTRAINT users_pkey PRIMARY KEY (id)
);