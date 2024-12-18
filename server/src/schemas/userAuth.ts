import z from "zod";

export const userSignupSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be 8 or more characters long" }),
  username: z
    .string()
    .min(3, { message: "Username must be 3 or more characters long" }),
});

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export interface User {
  id: String;
  email: String;
  password: String;
  name: String;
  createdAt: Date;
  updatedAt: Date;
}
