import serverless from "serverless-http"
import app from "../src/app.js"
import { connectDb } from "../src/db.js"
import { env } from "../src/env.js"

await connectDb(env.MONGO_URI)
export const config = { runtime: "nodejs20" }
export default serverless(app)
