import { Schema, model } from "mongoose";
const UserSchema = new Schema(
    {
        email: { type: String, unique: true, required: true, index: true },
        passwordHash: { type: String, required: true },
        role: { type: String, enum: ["surgeon", "admin"], default: "surgeon", index: true},
        name: { type: String, required: true }
    },
    { timestamps: true }
);
export default model("User", UserSchema);