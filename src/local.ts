import app from "./app.js"
import { connectDb } from "./db.js"
import { env } from "./env.js"

await connectDb(env.MONGO_URI)
app.listen(env.PORT, () => {})
