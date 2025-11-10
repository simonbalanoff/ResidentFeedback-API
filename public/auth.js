import jwt from "jsonwebtoken";
import { env } from "./env.js";
export function auth(requiredRoles) {
    return (req, res, next) => {
        const h = req.headers.authorization || "";
        const t = h.startsWith("Bearer ") ? h.slice(7) : "";
        try {
            const decoded = jwt.verify(t, env.JWT_SECRET);
            if (requiredRoles && !requiredRoles.includes(decoded.role))
                return res.status(403).json({ error: "forbidden" });
            req.user = decoded;
            next();
        }
        catch {
            res.status(401).json({ error: "unauthorized" });
        }
    };
}
//# sourceMappingURL=auth.js.map