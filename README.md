# Resident Feedback API

A secure REST API for managing surgical assessments between attendings and residents.  
Built with **Node.js, Express, and MongoDB**, this backend handles authentication, feedback submissions, and role-based access for medical users.

---

## 🚀 Features
- JWT-based authentication (access + refresh tokens)
- Role-based routing for attendings and residents
- Endpoints for creating, viewing, and updating assessments
- Secure password hashing and session persistence
- Helmet and CORS middleware for API protection
- Deployed to Render / Vercel-compatible serverless environments

---

## 🧱 Tech Stack
- **Language:** TypeScript (NodeNext)
- **Framework:** Express.js
- **Database:** MongoDB + Mongoose
- **Auth:** JWT (Access / Refresh), bcrypt, Keychain integration with iOS app
- **Deployment:** Render
- **Other:** Helmet, dotenv, body-parser
