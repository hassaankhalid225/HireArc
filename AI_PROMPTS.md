# AI Prompts Log

This document records the key AI prompts utilized during the coding and finalization phases of the **HireArc** application (formerly JobSphere).

### Prompt 1: Backend Architecture Setup
> "Set up the backend structure for HireArc using FastAPI, Motor for MongoDB connectivity, and separate routers for auth, jobs, user profiles, stats, and search."

### Prompt 2: OAuth Authentication & Cookie Management
> "Implement secure cookie-based OAuth2 login with Google and GitHub in FastAPI, including callback handlers and secure httpOnly cookies for access/refresh tokens."

### Prompt 3: Job Scraper Automation
> "Create a web scraper script in `jobsphere-backend` to fetch jobs from target APIs/sites and run it automatically via GitHub Actions scheduler."

### Prompt 4: Next.js frontend with Tailwind CSS
> "Build the Next.js frontend utilizing Tailwind CSS and React 19, including state management for tracking saved jobs, search filters, and profile updates."

### Prompt 5: Brand Identity Transition (Rebranding to HireArc)
> "Rebrand the entire application from 'JobSphere' to 'HireArc'. Update all titles, logos, branding colors, environment keys, and console messages system-wide."

### Prompt 6: Dashboard Design & Theme Integration
> "Improve the admin dashboard visual layout to use a modern Zinc-based dark/light theme, and fix sidebar menu responsiveness and logo centering."

### Prompt 7: Layout and Navigation Cleanups
> "Resolve layout issue where the topbar in the dashboard page overlaps with the global navbar. Remove redundant headers and adjust top padding."

### Prompt 8: Backend Testing & GitHub Actions
> "Write at least 4 unit tests and 1 E2E integration test for the FastAPI backend using pytest and mongomock to mock database interactions. Configure a GitHub Actions workflow to run these tests automatically on push."
