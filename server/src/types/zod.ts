import z from "zod";

export const signupSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Username must contain at least 3 characters" }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must contain at least 8 characters" }),
});

export const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const createCourseSchema = z.object({
  courseId: z.string(),
  description: z
    .string()
    .min(10, { message: "Description must contain at least 10 characters" }),
  price: z
    .number()
    .min(0, { message: "Price must be greater than or equal to 0" }),
  imageUrl: z.string().url(),
});

export const updateCourseSchema = z.object({
  courseId: z.string(),
  description: z
    .string()
    .min(10, { message: "Description must contain at least 10 characters" }),
  price: z
    .number()
    .min(0, { message: "Price must be greater than or equal to 0" }),
  imageUrl: z.string().url(),
});

export const createFolderSchema = z.object({
  courseId: z.string(),
  name: z.string().min(3),
});

export const createContentSchema = z.object({
  folderId: z.string(),
  name: z.string().min(3),
});
