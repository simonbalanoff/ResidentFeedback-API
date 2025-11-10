import { Schema, model, Types } from "mongoose";
const PasswordResetSchema = new Schema({
    userId: { type: Types.ObjectId, ref: "User", index: true, required: true },
    token: { type: String, unique: true, required: true, index: true },
    expiresAt: { type: Date, required: true, index: true },
    used: { type: Boolean, default: false, index: true }
}, { timestamps: true });
export default model("PasswordReset", PasswordResetSchema);
//# sourceMappingURL=PasswordReset.js.map