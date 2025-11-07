import { z } from "zod";
export const loginSchema = z.object({ email: z.string().email(), password: z.string().min(8) });
export const registerSchema = z.object({ name: z.string().min(1), email: z.string().email(), password: z.string().min(8) });
export const refreshSchema = z.object({ refreshToken: z.string().min(10) });
export const forgotSchema = z.object({ email: z.string().email() });
export const resetSchema = z.object({ token: z.string().min(10), password: z.string().min(8) });
export const changePasswordSchema = z.object({ currentPassword: z.string().min(8), newPassword: z.string().min(8) });
export const createAssessmentSchema = z.object({
  residentId: z.string(),
  surgeryType: z.string().min(1),
  complexity: z.enum(["Low", "Moderate", "High"]),
  trustLevel: z.enum(["Limited Participation", "Direct Supervision", "Indirect Supervision", "Practice Ready"]),
  note: z.string().optional().default(""),
  feedback: z.string().optional().default("")
});