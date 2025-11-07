import { Request, Response, NextFunction } from "express";
export function notFound(req: Request, res: Response) {
    res.status(404).json({ error: "not_found" });
}

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    if(res.headersSent) return next(err);
    res.status(500).json({ error: "server_error" });
}