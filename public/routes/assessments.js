import { Router } from "express";
import Assessment from "../models/Assessment.js";
import { auth } from "../auth.js";
import { createAssessmentSchema } from "../validate.js";
export const assessmentsRouter = Router();
assessmentsRouter.post("/", auth(["surgeon", "admin"]), async (req, res) => {
    const parsed = createAssessmentSchema.safeParse(req.body);
    if (!parsed.success)
        return res.status(400).json({ error: "invalid" });
    const doc = await Assessment.create({
        surgeonId: req.user.sub,
        residentId: parsed.data.residentId,
        surgeryType: parsed.data.surgeryType,
        complexity: parsed.data.complexity,
        trustLevel: parsed.data.trustLevel,
        note: parsed.data.note,
        feedback: parsed.data.feedback
    });
    res.status(201).json({ id: doc.id });
});
assessmentsRouter.get("/", auth(["surgeon", "admin"]), async (req, res) => {
    const { residentId, limit = "20", before } = req.query;
    const q = {};
    if (req.user.role !== "admin")
        q.surgeonId = req.user.sub;
    if (residentId)
        q.residentId = residentId;
    if (before)
        q.createdAt = { $lt: new Date(before) };
    const items = await Assessment.find(q)
        .sort({ createdAt: -1 })
        .limit(Math.min(Number(limit), 100))
        .lean();
    res.json(items);
});
//# sourceMappingURL=assessments.js.map