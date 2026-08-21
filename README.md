# Google Forms Lite

A simplified Google Forms clone featuring a dynamic form builder, live form filler, and response management dashboard. The project is structured as a full-stack TypeScript monorepo.

## 🚀 Live Demo
- **Deployed App:** https://google-forms-lite-client-pied.vercel.app
- **API Endpoint:** https://google-forms-lite-l88p.onrender.com/api

---

## 🛠️ Tech Stack

- **Front-End:** React, TypeScript, Redux Toolkit (RTK Query), Formik + Yup (Validation), Sonner (Toasts), Tailwind CSS
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

## ⚙️ Environment Variables (ENV) Configuration

To ensure seamless API communication, proper database connectivity, and protection against CORS errors in production environments, configuration files must be properly set up for both projects.

### 1. Back-End (`server/.env` or Render Environment Settings)

Create a `.env` file inside the `server/` directory for local development, or add these keys directly within the Render dashboard panel:

```env
# Application environment mode (development / production)
NODE_ENV=development

# The port number where the Express server will be listening
PORT=5000

# Connection string for the PostgreSQL database (Neon/Supabase Connection Pool URL)
DATABASE_URL="postgresql://username:password@localhost:5432/google_forms_lite?schema=public"

# Direct database connection string (strictly required for running Prisma migrations successfully)
DIRECT_DATABASE_URL="postgresql://username:password@localhost:5432/google_forms_lite?schema=public"

# The absolute URL of your deployment frontend (required for the server's strict CORS configuration)
FRONTEND_URL=https://google-forms-lite-client-pied.vercel.app
```

### 2. Front-End (`client/.env` or Vercel Build Command Override)

For local development, create a `.env` file inside the `client/` directory. For production, inject this variable directly into the Vercel deployment pipeline command:

```env
# The absolute base URL pointing to your Express API server (must include the /api prefix)
VITE_API_BASE_URL=https://google-forms-lite-l88p.onrender.com/api
```

---

## 💻 Local Setup & Installation

### Prerequisites
- Node.js (v18 or higher)
- Active PostgreSQL instance running locally or via a cloud database provider (Neon/Supabase)

### 1. Clone the Repository
```bash
git clone https://github.com/Diamond-FoxUA/google-forms-lite.git
cd google-forms-lite
```

### 2. Configure Environment Variables
Create a `.env` file inside the `server/` directory following the configuration instructions outlined above.

### 3. Install Dependencies
Execute the installation process from the **root** project directory to install all monorepo workspace packages:
```bash
npm install
```

### 4. Initialize Database & Run Migrations
Generate the required local Prisma client artifacts and execute relational database schema migrations:
```bash
npm run db:generate
npm run db:migrate
```

### 5. Run the Application
Launch both the front-end React application and back-end Express API concurrently using a single command from the root directory:
```bash
npm run dev
```
- Client application interface will be available at: `http://localhost:5173`
- Back-end Server REST API endpoint will be available at: `http://localhost:5001`

---

## 🗄️ Database Schema

The relational database architecture is built utilizing Prisma ORM, configured with strict cascading deletes to preserve full data integrity:
- **Forms:** Stores core structural elements including `id`, `title`, `description`, and `created_at`.
- **Questions:** Stores dynamic form item structures using types (`TEXT`, `MULTIPLE_CHOICE`, `CHECKBOX`, `DATE`) alongside serialized JSON choices.
- **Responses:** Tracks individual user form submission and completion sessions.
- **Answers:** Stores discrete user input strings linked back to questions using relational tables with native `JsonB` format handling.

---

## 📄 License
This project is licensed under the MIT License.

