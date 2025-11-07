import jwt from "jsonwebtoken";
import { env } from "./env";

export function signAccess(payload: object) {
    return jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.ACCESS_EXPIRES });
}

export function signRefresh(payload: object) {
    return jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.REFRESH_EXPIRES });
}

export function verifyToken(token: string) {
    return jwt.verify(token, env.JWT_SECRET) as any;
}