import { Router } from "express";

export const adminRouter = Router();

adminRouter.post("/course");
adminRouter.post("/course/bulk");
