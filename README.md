# Sun Kimsrun Portfolio

A personal developer portfolio built with Next.js, React, TypeScript, Tailwind CSS, and Three.js.

## Features

- Responsive portfolio sections for education, experience, projects, skills, and contact
- Interactive 3D visual elements built with React Three Fiber and Drei
- Motion and smooth-scrolling effects powered by Framer Motion, GSAP, and Lenis
- Light and dark theme support
- Dynamic project detail routes at `/projects/[slug]`
- Contact form API route that sends messages through Gmail using Nodemailer

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS 4
- Three.js, React Three Fiber, and React Three Drei
- Framer Motion and GSAP
- Nodemailer

## Getting Started

### Prerequisites

- Node.js 20 or later
- npm

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create a `.env.local` file in the project root:

```env
GMAIL_USER=your-gmail-address@gmail.com
GMAIL_APP_PASSWORD=your-google-app-password
```

`GMAIL_APP_PASSWORD` must be a Google App Password, not your normal Gmail password. The contact form sends messages to `sunkimsrun123@gmail.com`.

### Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

```bash
npm run dev      # Start the development server
npm run build    # Create a production build
npm run start    # Run the production server
npm run lint     # Run linting
```

## Project Structure

```text
app/                 Next.js routes, layouts, styles, and API endpoints
components/          Portfolio sections and interactive UI components
data/                Project and GitHub activity data
lib/                 Shared utilities
public/              Images and other static assets
style/               Reusable visual-effect components
```

## License

This project is intended as a personal portfolio. All rights reserved.
