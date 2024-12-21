import { Router } from "express";
import { getPurchases, purchaseCourse } from "../controllers/userControllers";

export const userRouter = Router();

userRouter.get("/buy/:courseId", purchaseCourse);
userRouter.get("/purchases", getPurchases);
