import { Router } from "express";

import { adminRouter } from "./adminRouter";
import { userRouter } from "./userRouter";
import { courseRouter } from "./courseRouter";
import { authRouter } from "./authRouter";

const appRouter = Router();

appRouter.use("/auth", authRouter);
appRouter.use("/admin", adminRouter);
appRouter.use("/user", userRouter);
appRouter.use("/course", courseRouter);

export default appRouter;
