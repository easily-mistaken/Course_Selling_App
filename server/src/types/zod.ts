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

export const courseSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must contain at least 3 characters" }),
  description: z
    .string()
    .min(10, { message: "Description must contain at least 10 characters" }),
  price: z
    .number()
    .min(0, { message: "Price must be greater than or equal to 0" }),
  imageUrl: z.string().url(),
});

export const updateCourseSchema = courseSchema.partial();

export interface User {
  id: string;
  email: string;
  password: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
  role: "USER" | "ADMIN" | "SUPERADMIN";
}
