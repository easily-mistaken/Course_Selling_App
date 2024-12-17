import { Router } from "express";

import { adminRouter } from "./adminRouter";
import { userRouter } from "./userRouter";
import { courseRouter } from "./courseRouter";

export const appRouter = Router();

appRouter.use("/admin", adminRouter);
appRouter.use("/user", userRouter);
appRouter.use("/course", courseRouter);
