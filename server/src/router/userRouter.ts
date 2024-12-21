import { Router } from "express";
import {
  getPurchases,
  purchaseCourseById,
} from "../controllers/userControllers";

export const userRouter = Router();

userRouter.get("/buy/:courseId", purchaseCourseById);
userRouter.get("/purchases", getPurchases);
