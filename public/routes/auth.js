import { Router } from "express";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { loginSchema, registerSchema, refreshSchema, forgotSchema, resetSchema } from "../validate.js";
import { signAccess, signRefresh, verifyToken } from "../tokens.js";
import User from "../models/User.js";
import RefreshToken from "../models/RefreshToken.js";
import PasswordReset from "../models/PasswordReset.js";
import { auth } from "../auth.js";
export const authRouter = Router();
authRouter.post("/register", async (req, res) => {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success)
        return res.status(400).json({ error: "invalid" });
    const exists = await User.findOne({ email: parsed.data.email });
    if (exists)
        return res.status(409).json({ error: "exists" });
    const passwordHash = await bcrypt.hash(parsed.data.password, 12);
    const user = await User.create({ email: parsed.data.email, passwordHash, name: parsed.data.name, role: "surgeon" });
    const accessToken = signAccess({ sub: user.id, role: user.role, name: user.name });
    const refreshToken = signRefresh({ sub: user.id, role: user.role });
    await RefreshToken.create({ userId: user.id, token: refreshToken, expiresAt: new Date(Date.now() + 30 * 24 * 3600 * 1000) });
    res.status(201).json({ accessToken, refreshToken });
});
authRouter.post("/login", async (req, res) => {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success)
        return res.status(400).json({ error: "invalid" });
    const user = await User.findOne({ email: parsed.data.email });
    if (!user)
        return res.status(401).json({ error: "invalid" });
    const ok = await bcrypt.compare(parsed.data.password, user.passwordHash);
    if (!ok)
        return res.status(401).json({ error: "invalid" });
    const accessToken = signAccess({ sub: user.id, role: user.role, name: user.name });
    const refreshToken = signRefresh({ sub: user.id, role: user.role });
    await RefreshToken.create({ userId: user.id, token: refreshToken, expiresAt: new Date(Date.now() + 30 * 24 * 3600 * 1000) });
    res.json({ accessToken, refreshToken });
});
authRouter.post("/refresh", async (req, res) => {
    const parsed = refreshSchema.safeParse(req.body);
    if (!parsed.success)
        return res.status(400).json({ error: "invalid" });
    const doc = await RefreshToken.findOne({ token: parsed.data.refreshToken, revoked: false });
    if (!doc)
        return res.status(401).json({ error: "invalid" });
    try {
        const payload = verifyToken(parsed.data.refreshToken);
        const accessToken = signAccess({ sub: payload.sub, role: payload.role });
        res.json({ accessToken });
    }
    catch {
        res.status(401).json({ error: "invalid" });
    }
});
authRouter.post("/logout", async (req, res) => {
    const parsed = refreshSchema.safeParse(req.body);
    if (!parsed.success)
        return res.status(400).json({ error: "invalid" });
    await RefreshToken.updateOne({ token: parsed.data.refreshToken }, { $set: { revoked: true } });
    res.json({ ok: true });
});
authRouter.get("/me", auth(["surgeon", "admin"]), async (req, res) => {
    const user = await User.findById(req.user.sub).lean();
    if (!user)
        return res.status(404).json({ error: "not_found" });
    res.json({ id: user._id, email: user.email, name: user.name, role: user.role });
});
authRouter.post("/forgot", async (req, res) => {
    const parsed = forgotSchema.safeParse(req.body);
    if (!parsed.success)
        return res.status(400).json({ error: "invalid" });
    const user = await User.findOne({ email: parsed.data.email });
    if (!user)
        return res.json({ ok: true });
    const token = crypto.randomBytes(32).toString("hex");
    await PasswordReset.create({ userId: user.id, token, expiresAt: new Date(Date.now() + 60 * 60 * 1000) });
    res.json({ ok: true });
});
authRouter.post("/reset", async (req, res) => {
    const parsed = resetSchema.safeParse(req.body);
    if (!parsed.success)
        return res.status(400).json({ error: "invalid" });
    const pr = await PasswordReset.findOne({ token: parsed.data.token, used: false, expiresAt: { $gt: new Date() } });
    if (!pr)
        return res.status(400).json({ error: "invalid" });
    const user = await User.findById(pr.userId);
    if (!user)
        return res.status(404).json({ error: "not_found" });
    user.passwordHash = await bcrypthash(parsed.data.password);
    await user.save();
    pr.used = true;
    await pr.save();
    res.json({ ok: true });
});
async function bcrypthash(p) {
    return await bcrypt.hash(p, 12);
}
//# sourceMappingURL=auth.js.map