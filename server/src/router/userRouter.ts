import { Router } from "express";

export const userRouter = Router();

userRouter.post("/login");
userRouter.get("/courses");
userRouter.get("/buy/:courseId");
userRouter.get("/purchases");
