import { Router } from "express";
import {
  createCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/adminControllers";

export const adminRouter = Router();

adminRouter.post("/signup", signUp);
adminRouter.post("/signin");
adminRouter.post("/create", createCourse);
adminRouter.put("/course/:cousreId", updateCourse);
adminRouter.delete("/course/:courseId", deleteCourse);
