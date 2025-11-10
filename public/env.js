import "dotenv/config";
export const env = {
    NODE_ENV: process.env.NODE_ENV || "development",
    PORT: Number(process.env.PORT || 3000),
    MONGO_URI: process.env.MONGO_URI || "",
    JWT_SECRET: process.env.JWT_SECRET || "",
    ACCESS_EXPIRES: process.env.ACCESS_EXPIRES || "15m",
    REFRESH_EXPIRES: process.env.REFRESH_EXPIRES || "30d",
    CORS_ORIGINS: (process.env.CORS_ORIGINS || "").split(",").map(s => s.trim()).filter(Boolean),
    RATE_GENERAL_MAX: Number(process.env.RATE_GENERAL_MAX || 500),
    RATE_AUTH_MAX: Number(process.env.RATE_AUTH_MAX || 100)
};
if (!env.MONGO_URI || !env.JWT_SECRET) {
    throw new Error("Missing env");
}
//# sourceMappingURL=env.js.map