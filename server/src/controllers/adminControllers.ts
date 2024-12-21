import { Request, Response } from "express";
import { courseSchema, updateCourseSchema } from "../types/zod";
import client from "../utils/prisma";

export async function createCourse(req: Request, res: Response) {
  try {
    const validateInput = courseSchema.safeParse(req.body);
    if (!validateInput.success) {
      res.status(400).json({ error: validateInput.error });
      return;
    }

    const { title, description, price, imageUrl } = validateInput.data;
    const creatorId = res.locals.Admin.creatorId;

    console.log(creatorId);

    const creator = await client.user.findFirst({
      where: { id: creatorId },
    });
    if (!creator) {
      res.status(404).json({ error: "Creator not found" });
      return;
    }

    const course = await client.course.create({
      data: {
        title,
        description,
        price,
        imageUrl,
        creator: {
          connect: {
            id: creatorId,
          },
        },
      },
    });

    res.status(201).json({ message: "Course created successfully" });
    return;
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

export async function updateCourse(req: Request, res: Response) {
  try {
    const courseId = req.params.courseId;
    const validateInput = updateCourseSchema.safeParse(req.body);

    if (!validateInput.success) {
      res.status(400).json({ error: validateInput.error });
      return;
    }

    const { title, description, price, imageUrl } = validateInput.data;

    if (!title && !description && !price && !imageUrl) {
      res.status(400).json({ message: "No fields provided for update." });
      return;
    }

    const updatedCourse = await client.course.update({
      where: { id: courseId },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(price && { price }),
        ...(imageUrl && { imageUrl }),
      },
    });
    res.status(200).json({ message: "Course updated successfully" });
    return;
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
    return;
  }
}

export async function deleteCourse(req: Request, res: Response) {
  try {
    const courseId = req.params.courseId;
    const id = res.locals.Admin.creatorId;

    const course = await client.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      res.status(404).json({ error: "Course not found" });
      return;
    }

    if (course.creatorId !== id) {
      res
        .status(403)
        .json({ error: "You are not authorized to delete this course" });
      return;
    }

    const response = client.course.delete({
      where: { id: courseId },
    });

    res.status(200).json({ message: "Course deleted successfully" });
    return;
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
    return;
  }
}
