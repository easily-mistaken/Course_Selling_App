import express from "express";
import dotenv from "dotenv";

import appRouter from "./router/appRouter";

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.get("/api/v1", appRouter);

app.listen(port, () => console.log("Server is listening on port: ", port));
