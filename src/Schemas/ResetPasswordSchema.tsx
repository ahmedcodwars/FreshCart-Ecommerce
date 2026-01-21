import { z } from "zod";

export const ResetPasswordSchema = z.object({
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    rePassword: z.string().min(6, "Password must be at least 6 characters")
})