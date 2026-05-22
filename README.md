# HireArc — Modern Job Aggregator (Frontend)

HireArc is a premium, modern job board aggregator web application built on Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS. It aggregates thousands of jobs from multiple company job boards and presents them in an editorial-style interface with micro-animations and zero user friction.

- **Live Site**: [https://hirearc.vercel.app](https://hirearc.vercel.app)
- **Backend API URL**: [https://hirearc-backend.onrender.com/api](https://hirearc-backend.onrender.com/api) (Placeholder/Production Backend)

---

## 🚀 Features

- **High-Fidelity UI**: Premium Zinc-themed styling, glassmorphism, responsive grid layouts, and custom interactive UI components.
- **Unified Job Search**: Search and filter by job titles, companies, locations, experience level, remote options, and salary ranges.
- **User Dashboard**: Save jobs, track job applications, update developer profile, and set up custom search email alerts.
- **Admin panel**: Clean and functional dashboards for system metrics, user lists, and job database monitoring.
- **OAuth Authentication**: Social login integration via Google and GitHub with secure session management via httpOnly cookies.
- **Smooth Animations**: Integrated with `framer-motion` and `gsap` for seamless micro-interactions and transitions.

---

## 🛠️ Tech Stack

- **Core**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS, ShadCN UI
- **Animations**: Framer Motion, GSAP, Canvas/WebGL background
- **Icons**: Lucide React

---

## 💻 Local Development Setup

### Prerequisites

Ensure you have Node.js (version 18 or above) installed.

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env.local` file in the root of the `jobsphere-next` directory:
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000/api
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 4. Build for Production
To build the static HTML and server-side bundle:
```bash
npm run build
```

### 5. Linting check
To check for code-quality guidelines and strict TypeScript/ESLint warnings:
```bash
npm run lint
```

---

## ⚙️ Environment Variables Reference

| Variable Name | Description | Example / Default |
|---|---|---|
| `NEXT_PUBLIC_BACKEND_URL` | The URL endpoint of the FastAPI backend router | `http://localhost:8000/api` |

---

## 🤖 CI/CD Pipeline

A GitHub Action configuration is set up under `.github/workflows/build.yml` to automatically verify that:
1. TypeScript compilations compile successfully (`npm run build`).
2. ESLint rules and syntax checking pass cleanly.
This ensures code quality is maintained on every push and pull request.
