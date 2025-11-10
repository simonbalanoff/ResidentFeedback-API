import mongoose from "mongoose"

mongoose.set("bufferCommands", false)

let cached = (global as any)._mongoose || { conn: null, promise: null }

export async function connectDb(uri: string) {
  if (cached.conn) return cached.conn
  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 8000,
      connectTimeoutMS: 8000,
      socketTimeoutMS: 20000
    })
  }
  cached.conn = await cached.promise
  ;(global as any)._mongoose = cached
  return cached.conn
}