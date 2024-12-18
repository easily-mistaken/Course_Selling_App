import { Router } from "express";

export const adminRouter = Router();

adminRouter.post("/signup");
adminRouter.post("/login");
adminRouter.post("/course");
adminRouter.post("/course/bulk");
