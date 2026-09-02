# Sun Kimsrun — Developer Portfolio

> A modern, interactive personal portfolio showcasing my experience, projects, technical skills, and journey as a Full-Stack Developer.

Built with **Next.js, React, TypeScript, Tailwind CSS, Three.js**, and modern animation libraries, this portfolio combines a responsive user interface with interactive 3D experiences and smooth animations.

---

## ✨ Features

* 🎨 **Modern & Responsive UI** — Optimized for desktop, tablet, and mobile devices
* 🧑‍💻 **Developer Portfolio** — Showcases education, experience, projects, skills, and contact information
* 🌐 **Interactive 3D Elements** — Built with React Three Fiber and Drei
* 🎬 **Smooth Animations** — Powered by Framer Motion and GSAP
* 🖱️ **Smooth Scrolling** — Implemented with Lenis
* 🌓 **Dark & Light Mode** — Theme support for different viewing preferences
* 📂 **Dynamic Project Pages** — Individual project pages using `/projects/[slug]`
* 📧 **Contact Form** — Server-side email delivery using Nodemailer and Gmail
* ⚡ **Modern Next.js Architecture** — Built with the App Router and TypeScript

---

## 🛠️ Tech Stack

### Frontend

* **Next.js 15**
* **React 19**
* **TypeScript**
* **Tailwind CSS 4**
* **HTML5 / CSS3**

### 3D & Animation

* **Three.js**
* **React Three Fiber**
* **React Three Drei**
* **Framer Motion**
* **GSAP**
* **Lenis**

### Backend & Services

* **Next.js API Routes**
* **Nodemailer**
* **Gmail SMTP**

### Development Tools

* **Git & GitHub**
* **VS Code**
* **npm**

---

## 📸 Portfolio Sections

The portfolio includes:

| Section        | Description                                    |
| -------------- | ---------------------------------------------- |
| **Hero**       | Introduction and personal branding             |
| **About**      | Developer background and professional overview |
| **Education**  | Academic background and learning journey       |
| **Experience** | Professional and development experience        |
| **Skills**     | Programming languages, frameworks, and tools   |
| **Projects**   | Selected development projects and case studies |
| **Contact**    | Contact form for sending messages              |

---

## 📁 Project Structure

```text
sunkimsrun/
├── app/                    # Next.js routes, layouts, styles & API endpoints
├── components/             # Reusable portfolio & UI components
├── data/                   # Project & GitHub activity data
├── lib/                    # Shared utilities
├── public/                 # Images, icons & static assets
├── style/                  # Reusable visual-effect components
├── .env.local              # Local environment variables
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

* **Node.js 20 or later**
* **npm**

You can verify your versions with:

```bash
node -v
npm -v
```

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/sunkimsrun.git
cd sunkimsrun
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
GMAIL_USER=your-gmail-address@gmail.com
GMAIL_APP_PASSWORD=your-google-app-password
```

> **Important:** `GMAIL_APP_PASSWORD` must be a Google App Password. Do not use your normal Gmail password.

The contact form uses these credentials to send messages through Gmail.

**Never commit `.env.local` to GitHub.**

### 4. Run the Development Server

```bash
npm run dev
```

Open your browser and visit:

```text
http://localhost:3000
```

---

## 📜 Available Scripts

| Command         | Description                  |
| --------------- | ---------------------------- |
| `npm run dev`   | Start the development server |
| `npm run build` | Create a production build    |
| `npm run start` | Start the production server  |
| `npm run lint`  | Run ESLint                   |

---

## 🔐 Environment Variables

| Variable             | Description                                       |
| -------------------- | ------------------------------------------------- |
| `GMAIL_USER`         | Gmail account used to send contact messages       |
| `GMAIL_APP_PASSWORD` | Google App Password used for Gmail authentication |

> Keep all environment variables containing credentials private and never commit them to source control.

---

## 🌍 Deployment

This project can be deployed to platforms that support Next.js applications, such as **Vercel**.

When deploying, remember to configure the required environment variables in the hosting platform.

---

## 📌 Project Goals

This portfolio was created to:

* Present my professional background and technical skills
* Showcase selected software development projects
* Demonstrate modern frontend and full-stack development practices
* Explore interactive 3D web experiences
* Provide a simple way for recruiters, developers, and potential clients to get in touch

---

## 👨‍💻 About Me

I'm a **Full-Stack Developer** with an Information Technology background and experience working across frontend and backend development.

My interests include:

* Full-Stack Web Development
* UI/UX Design
* Software Engineering
* APIs & Database Systems
* Cybersecurity
* Cryptography
* Modern Web Technologies

---

## 📄 License

This project is a personal portfolio.

**© Sun Kimsrun — All Rights Reserved.**
