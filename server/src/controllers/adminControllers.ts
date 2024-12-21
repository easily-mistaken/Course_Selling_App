import { Request, Response } from "express";
import { courseSchema } from "../schemas/course";

export function createCourse(req: Request, res: Response) {
  try {
    const validateInput = courseSchema.safeParse(req.body);
    if (!validateInput.success) {
      return res.status(400).json({ error: validateInput.error });
    }

    const title = validateInput.data.title;
    const description = validateInput.data.description;
    const price = validateInput.data.price;
    const imageUrl = validateInput.data.imageUrl;
    const creatorId = res.locals.Admin.creatorId; // This is the creatorId of the admin who created the course

    console.log(creatorId);

    res.status(201).json({ message: "Course created successfully" });
  } catch (error) {}
}

export function updateCourse(req: Request, res: Response) {
  try {
  } catch (error) {}
}

export function deleteCourse(req: Request, res: Response) {
  try {
  } catch (error) {}
}
