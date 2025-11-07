import { Router } from "express";
import Resident from "../models/Resident";
import { auth } from "../auth";

export const residentsRouter = Router();

residentsRouter.get("/", auth(["surgeon", "admin"]), async (req, res) => {
  const q = await Resident.find({ active: true }).sort({ name: 1 }).lean();
  res.json(q);
});

residentsRouter.post("/", auth(["admin"]), async (req, res) => {
  const { name, pgYear, active } = req.body || {};
  if (!name || typeof pgYear !== "number") return res.status(400).json({ error: "invalid" });
  const doc = await Resident.create({ name, pgYear, active: active ?? true });
  res.status(201).json({ id: doc.id });
});

residentsRouter.patch("/:id", auth(["admin"]), async (req, res) => {
  const { id } = req.params;
  const { name, pgYear, active } = req.body || {};
  const update: any = {};
  if (name) update.name = name;
  if (typeof pgYear === "number") update.pgYear = pgYear;
  if (typeof active === "boolean") update.active = active;
  const doc = await Resident.findByIdAndUpdate(id, { $set: update }, { new: true });
  if (!doc) return res.status(404).json({ error: "not_found" });
  res.json({ id: doc.id });
});