import jwt from "jsonwebtoken";
import { env } from "./env.js";
export function signAccess(payload) {
    return jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.ACCESS_EXPIRES });
}
export function signRefresh(payload) {
    return jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.REFRESH_EXPIRES });
}
export function verifyToken(token) {
    return jwt.verify(token, env.JWT_SECRET);
}
//# sourceMappingURL=tokens.js.map