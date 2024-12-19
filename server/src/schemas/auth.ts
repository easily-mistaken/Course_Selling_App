import z from "zod";

// Zod validation schemas
export const signupSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must contain at least 8 characters" }),
  username: z
    .string()
    .min(3, { message: "Username must contain at least 3 characters" }),
  role: z.enum(["USER", "ADMIN", "SUPERADMIN"]),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export interface User {
  id: number;
  email: string;
  password: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
  role: "USER" | "ADMIN" | "SUPERADMIN";
}

export interface Role {}
