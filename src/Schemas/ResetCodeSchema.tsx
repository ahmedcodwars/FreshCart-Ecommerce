import { z } from "zod";

export const resetCodeSchema = z.object({
    resetCode: z
        .string()
        .min(6, "Reset code must be 6 digits")
        .max(6, "Reset code must be 6 digits")
        .regex(/^\d+$/, "Reset code must contain only numbers"),
});