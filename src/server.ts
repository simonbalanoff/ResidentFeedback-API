import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { env } from "./env.js";
import { connectDb } from "./db.js";
import { corsMiddleware } from "./middleware/cors.js";
import { notFound, errorHandler } from "./middleware/errors.js";
import { authRouter } from "./routes/auth.js";
import { residentsRouter } from "./routes/residents.js";
import { assessmentsRouter } from "./routes/assessments.js"

const app = express();

app.set("x-powered-by", false);
app.use(helmet());
app.use(corsMiddleware);
app.use(express.json({ limit: "1mb" }));

const generalLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: env.RATE_GENERAL_MAX, standardHeaders: true, legacyHeaders: false });
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: env.RATE_AUTH_MAX, standardHeaders: true, legacyHeaders: false });

app.use(generalLimiter);
app.use("/auth", authLimiter);

app.use("/auth", authRouter);
app.use("/residents", residentsRouter);
app.use("/assessments", assessmentsRouter);

app.get("/health", (_req, res) => res.json({ ok: true }))

app.use(notFound);
app.use(errorHandler);

await connectDb(env.MONGO_URI)
const port = Number(process.env.PORT || env.PORT || 3000)
app.listen(port, () => {})
