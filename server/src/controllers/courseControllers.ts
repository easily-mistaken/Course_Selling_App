import { Request, Response } from "express";
import client from "../utils/prisma";

export async function getCourseById(req: Request, res: Response) {
  try {
    const courseId = req.params.courseId;

    const course = await client.course.findUnique({
      where: { id: Number(courseId) },
    });

    if (!course) {
      return res.status(404).json({ msg: "Course not found" });
    }
    res.json({ course });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
}

export async function getBulkCourse(req: Request, res: Response) {
  try {
    const courses = await client.course.findMany();

    res.json({ courses });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
}
