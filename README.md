# Resident Feedback API

A secure REST API for managing surgical assessments between attendings and residents. Handles authentication, role-based routing, and feedback submission.

**Stack:** TypeScript · Express · MongoDB  
**Related:** [Resident Feedback App](https://github.com/simonbalanoff/ResidentFeedback-App)

---

## Features

- **JWT Authentication** — Access and refresh token flow with secure password hashing
- **Role-Based Routing** — Separate permissions and endpoints for attendings and residents
- **Assessment Endpoints** — Create, retrieve, and update evaluations
- **Security Middleware** — Helmet and CORS configured for production use
- **iOS Keychain Integration** — Token lifecycle designed to pair with the SwiftUI client

---

## 🏗 Architecture

| Concern | Details |
|---|---|
| Language | TypeScript (NodeNext) |
| Framework | Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT (access + refresh), bcrypt |
| Deployment | Render |

Core endpoints: `/auth/login`, `/auth/register`, `/auth/refresh`, `/residents`, `/assessments`

---

*Public for portfolio review only. You may view this code to evaluate my work but may not use, copy, modify, or distribute it.*
