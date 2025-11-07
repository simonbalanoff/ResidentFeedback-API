import { Schema, model } from "mongoose";
const ResidentSchema = new Schema(
    {
        name: { type: String, required: true, index: true },
        pgYear: { type: Number, required: true },
        active: { type: Boolean, default: true, index: true }
    },
    { timestamps: true }
);
export default model("Resident", ResidentSchema);