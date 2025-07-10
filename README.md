# Better Auth Starter Template

This is a complete authentication system built with **Better Auth**, **Next.js 15 App Router**, **Drizzle**, and **Neon (Postgres)**. It includes email/password authentication, OAuth (Google & GitHub), role management, email verification, and more—ready for production.

## 🚀 Features

- 🔐 Authentication with Email/Password and OAuth (Google, GitHub)
- ✅ Email Verification & Password Reset
- 🔁 Magic Link Login
- 👥 Role-based Access Control (RBAC) with Admin Panel
- 🍪 Secure Sessions & Cookie Handling
- 🧰 Built-in Hooks, Middleware, and Utilities
- 📬 Email Templates via Nodemailer
- 🔄 Client + Server Actions Integration
- 📦 Prisma ORM with PostgreSQL on Neon.tech
- 🌐 Type-safe Auth Client
- 🧪 Better Auth Plugins (argon2, Magic Link, etc.)
- 🎨 UI-ready components for sign-in, sign-up, and profile management

---

## 🛠️ Getting Started

<b>1. Clone the Repository</b>

```bash
git clone https://github.com/your-username/better-auth-app.git
cd better-auth-app
```

<b>2. Install Dependencies</b>

```bash
npm install
# or
pnpm install
```

<b>3. Setup Environment Variables</b>

Create a `.env` file based on `.env.example`:

```env
DATABASE_URL=your_neon_postgres_connection
BETTER_AUTH_SECRET=...
BETTER_AUTH_URL=...

NEXT_PUBLIC_URL=...

ADMIN_EMAILS="...#...#..."

GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...

GITHUB_CLIENT_ID="Ov23li431JufyS8j60HR"
GITHUB_CLIENT_SECRET="17b33221c2f31ddc3e0bd64261497881f98dcb43"

NODEMAILER_USER=...
NODEMAILER_APP_PASSWORD=...
```

> Get a Neon DB at [neon.tech](https://neon.tech), and fill in your SMTP and OAuth credentials.

---

## 🧱 Database Setup

---

## 🧠 Project Structure

```
lib/
 ├── auth.ts              # Server-side Better Auth config
 ├── auth-client.ts       # Client-side Better Auth instance
 ├── db                   # db
    ├── index.ts
    ├── schema
          ├── ...
app/
 ├── api/auth/[...all]/   # Auth route handler
 ├── profile/             # Protected profile page
 ├── admin/dashboard/     # Admin-only route
 └── ...
components/
 ├── general
      ├── ...
 ├── ui
      ├── ...
 └── ...
```

---

## 🧪 Development Scripts

Update your `package.json`:

```json
"scripts": {
  "dev": "next dev --turbopack",
  "build": "next build",
  "start": "next start",
  "drizzle:push": "drizzle-kit push"
}
```

---

## 🔑 Authentication Options

### ✅ Email & Password
- Minimum password length
- Auto sign-in after sign-up
- Argon2 password hashing
- Email verification required

### 🧙‍♂️ Magic Link
- Optional one-click sign-in experience

### 🌐 OAuth
- Google & GitHub integration

---

## 🛡️ Role Management

- Admin/Editor/User roles
- Guarded routes (e.g., `/admin/dashboard`)
- Role-based UI and access
- Enum-based role system with Prisma
- Role editing from the Admin Panel

---

## ✉️ Email Features

- Email verification links
- Custom email templates
- Password reset flow
- Post sign-up onboarding

---

## 🔄 Auth Hooks & Middleware

- Validate email format
- Transform name input
- Session cookie checks
- Typed `useSession` hook with custom fields

---

## 📸 User Profiles

- Upload and show user image
- Update name and password
- Custom session data

---

## 🔌 Plugins Used

- `@node-rs/argon2` for secure hashing
- `Magic Link` login
- `nextCookies` plugin
- Better Auth Admin Plugin

---

## ✅ To Do

- [x] Sign In/Up with Email
- [x] OAuth Login (Google/GitHub)
- [x] Role-based access control
- [x] Admin panel to manage users
- [x] Email verification & password reset
- [x] Magic Link login
- [x] Profile management
- [x] Nodemailer integration

---

## 🧑‍💻 Author

Made with ❤️ by [Mir Tarhimul](https://github.com/mmtq)

---

## 📄 License

MIT License
