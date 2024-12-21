import z from "zod";

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
