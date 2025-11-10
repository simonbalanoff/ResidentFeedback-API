import mongoose from "mongoose"

let cached: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } = (global as any)._mongoose || { conn: null, promise: null }

export async function connectDb(uri: string) {
  if (cached.conn) return cached.conn
  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, { maxPoolSize: 5, serverSelectionTimeoutMS: 8000 })
  }
  cached.conn = await cached.promise
  ;(global as any)._mongoose = cached
  return cached.conn
}