export function notFound(req, res) {
    res.status(404).json({ error: "not_found" });
}
export function errorHandler(err, req, res, next) {
    if (res.headersSent)
        return next(err);
    res.status(500).json({ error: "server_error" });
}
//# sourceMappingURL=errors.js.map