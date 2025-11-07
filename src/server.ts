import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { env } from "./env";
import { connectDb } from "./db";
import { corsMiddleware } from "./middleware/cors";
import { notFound, errorHandler } from "./middleware/errors";
import { authRouter } from "./routes/auth";
import { residentsRouter } from "./routes/residents";
import { assessmentsRouter } from "./routes/assessments";

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

app.use(notFound);
app.use(errorHandler);

connectDb().then(() => {
  app.listen(env.PORT, () => {});
});