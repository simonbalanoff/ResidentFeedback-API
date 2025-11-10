import cors from "cors";
import { env } from "../env.js";
export const corsMiddleware = cors({
    origin: (origin, cb) => {
        if(!origin) return cb(null, true);
        if(env.CORS_ORIGINS.length === 0) return cb(null, true);
        if(env.CORS_ORIGINS.includes(origin)) return cb(null, true);
        cb(new Error("Not allowed by CORS"));
    },
    credentials: false
})