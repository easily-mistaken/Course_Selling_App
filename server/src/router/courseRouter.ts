import { Router } from "express";
import { getBulkCourse, getCourseById } from "../controllers/courseControllers";

export const courseRouter = Router();

courseRouter.get("/course/bulk", getBulkCourse);
courseRouter.get("/:courseId", getCourseById);
