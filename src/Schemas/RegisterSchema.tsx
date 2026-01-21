import { z } from "zod";

export const RegisterSchema = z.object({
    name: z.string().min(3, "The name must be at least 3 characters"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    rePassword: z.string().min(6, "Password must be at least 6 characters")
})

