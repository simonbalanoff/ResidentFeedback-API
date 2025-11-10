import { Schema, model, Types } from "mongoose";
const RefreshTokenSchema = new Schema({
    userId: { type: Types.ObjectId, ref: "User", index: true, required: true },
    token: { type: String, unique: true, required: true, index: true },
    revoked: { type: Boolean, default: false, index: true },
    expiresAt: { type: Date, required: true, index: true }
}, { timestamps: true });
export default model("RefreshToken", RefreshTokenSchema);
//# sourceMappingURL=RefreshToken.js.map