import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "@/config/mongoose.config";
import apiRouter from "./modules/api.modules";
import { productionConsoleConfig } from "./core";
import common from "./common";
import { envConfig } from "./config/env.config";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

if (envConfig.server.enviroment === "production") {
  app.use(cors());
} else {
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    }),
  );
}

app.use(express.json());

app.use(cookieParser());

db.connect();

productionConsoleConfig();

app.use("/api/v1", apiRouter);

// app.use("/", (req, res) => {
//   try {
//     res.status(200).json({ message: "Test api in app file" });
//   } catch (error) {
//     console.error();
//   }
// });

app.use(common.globalErrorHandler.handler);

export default app;
