import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "./env.js";

export function auth(requiredRoles?: Array<"surgeon" | "admin">) {
    return (req: Request, res: Response, next: NextFunction) => {
        const h = req.headers.authorization || "";
        const t = h.startsWith("Bearer ") ? h.slice(7) : "";
        try {
            const decoded = jwt.verify(t, env.JWT_SECRET) as any;
            if(requiredRoles && !requiredRoles.includes(decoded.role))
                return res.status(403).json({ error: "forbidden" });
            (req as any).user = decoded;
            next();
        } catch {
            res.status(401).json({ error: "unauthorized" });
        }
    }
}