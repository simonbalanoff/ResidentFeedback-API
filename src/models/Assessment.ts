import { Schema, model, Types } from "mongoose";
const AssessmentSchema = new Schema(
    {
        surgeonId: { type: Types.ObjectId, ref: "User", required: true, index: true },
        residentId: { type: Types.ObjectId, ref: "Resident", required: true, index: true },
        surgeryType: { type: String, required: true, index: true },
        complexity: { type: String, enum: ["Low", "Moderate", "High"], required: true, index: true },
        trustLevel: { type: String, enum: ["Limited Participation", "Direct Supervision", "Indirect Supervision", "Practice Ready"], required: true, index: true },
        note: { type: String, default: "" },
        feedback: { type: String, default: "" }
    },
    { timestamps: true }
);
AssessmentSchema.index({ residentId: 1, createdAt: -1 });
export default model("Assessment", AssessmentSchema);