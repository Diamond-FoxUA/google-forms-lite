# Google Forms Lite

A simplified Google Forms clone featuring a dynamic form builder, live form filler, and response management dashboard. The project is structured as a full-stack TypeScript monorepo.

## 🚀 Live Demo

- **Deployed App:** 🚧 under development
- **API Endpoint:** 🚧 under development

---

## 🛠️ Tech Stack

- **Front-End:** React 18, TypeScript, Redux Toolkit (RTK Query), Formik + Yup (Validation), Sonner (Toasts), Tailwind CSS
- **Back-End:** Node.js, Express, TypeScript, Prisma ORM, PostgreSQL, Helmet (Security Headers), CORS, http-errors, Dotenv
- **Architecture:** Monorepo using `npm workspaces`

---

## 🗂️ Project Structure

```text
google-forms-lite/
├── client/          # React + TypeScript front-end application
├── server/          # Express + PostgreSQL back-end API
├── package.json     # Root package manager handling workspaces
└── README.md        # Documentation
```

---

## 💻 Local Setup & Installation

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL instance running locally or via a cloud provider (Neon/Supabase)

### 1. Clone the Repository

```bash
git clone https://github.com/Diamond-FoxUA/google-forms-lite.git
cd google-forms-lite
```

### 2. Configure Environment Variables

Create a `.env` file inside the `server` directory:

```env
PORT=5000
DATABASE_URL="postgresql://username:password@localhost:5432/google_forms_lite?schema=public"
```

### 3. Install Dependencies

Run the installation command in the **root** directory to install all npm packages for both client and server:

```bash
npm install
```

### 4. Initialize Database & Run Migrations

Generate the client artifacts and execute database schema migrations using Prisma:

```bash
npm run db:generate
npm run db:migrate
```

### 5. Run the Application

Start both the React development server and Express API concurrently with a single command from the root directory:

```bash
npm run dev
```

- Client will be available at: `http://localhost:5173`
- Server API will be available at: `http://localhost:5000`

---

## 🗄️ Database Schema

The relational database architecture is built with Prisma ORM using cascading deletes to ensure data integrity:

- **Forms:** Stores `id`, `title`, `description`, `created_at`.
- **Questions:** Stores form fields with types (`TEXT`, `MULTIPLE_CHOICE`, `CHECKBOX`, `DATE`) and structured JSON options.
- **Responses:** Tracks individual form submission sessions.
- **Answers:** Stores user inputs linked to questions using relational tables with `JsonB` support.

---

## 📜 License

This project is licensed under the MIT License.
