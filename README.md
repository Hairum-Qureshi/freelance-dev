# Freelance Dev

A full-stack freelance marketplace designed for **entry-level and early-career web developers** looking to gain freelance experience, build their portfolios, and establish a track record with real clients.

The project is built as a **full-stack monorepo** using **npm workspaces** and **Turborepo**, with a React frontend and NestJS backend.

---

## What This Project Is

Freelance Dev is intended to make freelance opportunities more accessible to developers who are still early in their careers.

The platform focuses on:

- Smaller, beginner-friendly freelance projects
- Helping developers build professional experience
- Building a public track record through completed projects and reviews
- Freelancer profiles and portfolios
- GitHub activity as supporting evidence of development experience
- Client-to-freelancer communication
- Payments through Stripe

The project is primarily intended as a **learning and portfolio project**, rather than a production-ready competitor to established freelance marketplaces.

---

## Core Features

The project is being developed around the following features:

- Google OAuth authentication
- JWT-based authentication
- Freelancer profiles
- Client and freelancer accounts
- Freelance job listings
- Job applications/proposals
- Client-to-freelancer messaging
- Freelancer reviews and star ratings
- GitHub profile integration
- Stripe payments
- PostgreSQL database
- Database indexing and query optimization

Some features may not yet be implemented.

---

## Repository Structure

```text
.
├── apps/
│   ├── backend/          # NestJS backend
│   └── frontend/         # React + Vite + Tailwind frontend
├── packages/             # Optional shared packages
├── package.json          # Root workspace + Turbo configuration
├── package-lock.json     # Single lockfile for the entire monorepo
├── turbo.json            # Turbo task pipeline
└── README.md
```

### Key Structural Notes

- This is a **monorepo**.
- Dependency management is centralized at the **repository root**.
- Each application remains a standalone project.
- Frontend and backend communicate through an explicit API.
- No shared code is required between applications.
- Shared packages can be introduced later when necessary.

---

## Tech Stack

### Backend (`apps/backend`)

- NestJS
- TypeScript
- PostgreSQL
- Neon
- Google OAuth
- JWT authentication
- Stripe

### Frontend (`apps/frontend`)

- React
- Vite
- TailwindCSS
- TypeScript
- Google OAuth

### Tooling

- npm workspaces
- Turborepo

---

## Prerequisites

You need:

- Node.js (LTS recommended)
- npm (v7+ for workspaces)
- A Google Cloud project
- Google OAuth credentials
- A Neon account/database

---

## Installation

From the **repository root**:

```bash
npm install
```

This installs dependencies for all workspace packages and generates a single `package-lock.json`.

Do **not** run `npm install` inside individual applications.

---

# Environment Variables

The repository contains example environment files for both applications:

```text
apps/
├── backend/
│   └── .env.example
└── frontend/
    └── .env.example
```

Copy each example file to `.env` before starting the applications.

### Backend

```bash
cp apps/backend/.env.example apps/backend/.env
```

The backend environment variables should include:

```env
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES=604800000
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

GOOGLE_OAUTH_CLIENT_ID=your_google_oauth_client_id_here
GOOGLE_OAUTH_CLIENT_SECRET=your_google_oauth_client_secret_here

NEON_DB_URL=your_neon_db_url_here
```

### Frontend

```bash
cp apps/frontend/.env.example apps/frontend/.env
```

The frontend should contain the backend URL and Google OAuth client ID:

```env
VITE_BACKEND_URL=http://localhost:3000
VITE_GOOGLE_OAUTH_CLIENT_ID=your_google_oauth_client_id_here
```

Because Vite exposes variables prefixed with `VITE_` to browser code:

**Never put the Google OAuth client secret in the frontend `.env` file.**

---

# Google OAuth Setup

Google authentication uses **OAuth 2.0 credentials from Google Cloud Console**.

Firebase is **not required** for authentication.

## 1. Create or Select a Google Cloud Project

Open the [Google Cloud Console](https://console.cloud.google.com/) and create a new project or select an existing project.

---

## 2. Configure the OAuth Consent Screen

In Google Cloud Console:

1. Open **Google Auth Platform** / **OAuth consent screen**.
2. Configure the application information.
3. Select the appropriate audience for your application.
4. Configure the scopes required by the application.

For basic Google sign-in, the application generally needs access to the user's basic profile and email information.

If the application is in testing mode, make sure the Google accounts you intend to use are configured as test users.

---

## 3. Create OAuth Client Credentials

In Google Cloud Console, go to:

**Google Auth Platform → Clients**

Create an **OAuth 2.0 Client ID**.

For the React frontend, configure a **Web application** client.

Add the frontend origin used during local development to the authorized JavaScript origins:

```text
http://localhost:5173
```

If the application is deployed later, add the appropriate production origin as well.

> The exact Google Cloud Console navigation may change over time, but the application requires an OAuth 2.0 **Client ID** and **Client Secret**.

---

## 4. Configure the Credentials

Google provides:

- Client ID
- Client Secret

The **Client ID** is safe to use in the frontend and is also required by the backend.

The **Client Secret is confidential** and must only be available to the backend.

### Backend

```env
GOOGLE_OAUTH_CLIENT_ID=your_google_oauth_client_id_here
GOOGLE_OAUTH_CLIENT_SECRET=your_google_oauth_client_secret_here
```

### Frontend

```env
VITE_GOOGLE_OAUTH_CLIENT_ID=your_google_oauth_client_id_here
```

The same Google OAuth Client ID should be used in both applications.

---

# Neon PostgreSQL Setup

The backend uses **PostgreSQL hosted through Neon**.

## 1. Create a Neon Account

Create an account at [Neon](https://neon.tech/).

Create a new PostgreSQL project for the application.

---

## 2. Create or Select a Database

After creating the Neon project, select the PostgreSQL database associated with the project.

Neon provides a PostgreSQL connection string for the database.

It will generally look similar to:

```text
postgresql://username:password@host/database?sslmode=require
```

The exact connection string will be provided by Neon.

---

## 3. Add the Connection String to the Backend

Open:

```text
apps/backend/.env
```

and set:

```env
NEON_DB_URL=your_neon_db_url_here
```

For example:

```env
NEON_DB_URL=postgresql://username:password@ep-example.us-east-2.aws.neon.tech/freelance_dev?sslmode=require
```

Use the connection string provided by **your Neon project** rather than the example above.

---

## 4. Verify the Database Connection

Start the backend:

```bash
npm run dev
```

If the Neon connection string is valid and the backend's database configuration is correct, NestJS should successfully establish a connection to PostgreSQL.

If the connection fails, verify:

- `NEON_DB_URL` is present
- The connection string is copied correctly
- The Neon database is available
- The connection string includes the required SSL configuration
- Your database credentials are correct

---

# Development

From the repository root, run:

```bash
npm run dev
```

Turborepo will start the development servers for the applications.

### Default Ports

Backend:

```text
http://localhost:3000
```

Frontend:

```text
http://localhost:5173
```

The frontend URL must match:

```env
FRONTEND_URL=http://localhost:5173
```

and the Google OAuth client's authorized JavaScript origins.

---

# Authentication Flow

The authentication flow is intentionally simple:

```text
┌─────────────┐
│   Browser   │
│ React/Vite  │
└──────┬──────┘
       │
       │ 1. Sign in with Google
       ▼
┌─────────────────┐
│   Google OAuth  │
└────────┬────────┘
         │
         │ 2. Google credential
         ▼
┌─────────────────┐
│ NestJS Backend  │
│                 │
│ Verify Google   │
│ identity        │
└────────┬────────┘
         │
         │ 3. Backend-issued JWT
         ▼
┌─────────────────┐
│ Authenticated   │
│ API requests    │
└─────────────────┘
```

Google is responsible for authenticating the user's Google account.

The backend is responsible for:

- Verifying the Google authentication credential
- Establishing trust in the authenticated Google account
- Issuing the application's JWT
- Authenticating subsequent API requests

This keeps the authentication boundary on the backend while allowing the React frontend and NestJS backend to remain independently deployable.

---

# JWT Configuration

The backend uses JWTs for authenticated API requests.

The following environment variables control JWT behavior:

```env
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES=604800000
```

### `JWT_SECRET`

A secret used by the backend to sign and verify JWTs.

For local development, you can generate your own random secret.

**Never commit the real secret to Git.**

### `JWT_EXPIRES`

Controls the JWT expiration period.

The current development configuration is:

```env
JWT_EXPIRES=604800000
```

---

# Environment Variable Security

Do **not** commit local `.env` files.

The repository should contain:

```text
.env.example
```

while local secrets should remain in:

```text
.env
```

Make sure `.gitignore` excludes local environment files.

### OAuth Client ID vs Client Secret

The Google OAuth **Client ID is not considered a secret** and is expected to be used by browser code.

The Google OAuth **Client Secret is confidential** and should only be available to the backend.

The Neon database connection string should also be treated as confidential because it contains database credentials.

---

# Project Goals

This project is being built as a practical full-stack learning project.

The primary goals are to gain experience with:

- Building a full-stack marketplace
- Designing PostgreSQL schemas
- Writing relational queries
- Database indexes and query performance
- Authentication and OAuth
- JWT-based sessions
- Stripe payment integration
- Third-party API integrations
- Backend architecture with NestJS
- Frontend architecture with React
- Building and consuming REST APIs
- Deploying a full-stack application

The project intentionally avoids unnecessary complexity so that the core application can remain achievable within approximately **one month**.

---

# Future Features

Potential future additions include:

- GitHub integration
- Freelancer reputation/progression
- Real-time messaging
- Email notifications
- Advanced job search
- Freelancer recommendations
- Improved marketplace analytics
- Production deployment
- Docker/containerization

These features are not necessarily part of the initial MVP.

---

# Status

**In development**

The application is being built incrementally, with the goal of producing a functional MVP rather than attempting to reproduce every feature of a large freelance marketplace.

---

## License

This project is currently intended as a personal learning and portfolio project.
