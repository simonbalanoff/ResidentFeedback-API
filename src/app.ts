import express from "express"
import { corsMiddleware } from "./middleware/cors.js"
import { notFound, errorHandler } from "./middleware/errors.js"
import { authRouter } from "./routes/auth.js"
import { residentsRouter } from "./routes/residents.js"
import { assessmentsRouter } from "./routes/assessments.js"

const app = express()

app.set("x-powered-by", false)
app.use(corsMiddleware)
app.use(express.json({ limit: "1mb" }))

app.get("/health", (_req, res) => res.json({ ok: true }))

app.use("/auth", authRouter)
app.use("/residents", residentsRouter)
app.use("/assessments", assessmentsRouter)

app.use(notFound)
app.use(errorHandler)

export default app
