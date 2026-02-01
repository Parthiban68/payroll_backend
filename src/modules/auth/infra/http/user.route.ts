import { Router } from "express";
import userControllers from "./user.controllers";
import common from "@/common";
import { CreateDtoSchema } from "../dto/create.dto";
import { LoginDtoSchema } from "../dto/login.dto";
import { authenticate } from "@/common/middleware/auth.middleware";

const userRouter = Router();

userRouter.post(
  "/register",
  common.validate(CreateDtoSchema),
  userControllers.userRegister,
);

userRouter.post(
  "/login",
  common.validate(LoginDtoSchema),
  userControllers.userLogin,
);

userRouter.post("/logout",authenticate, userControllers.userLogout);

userRouter.get("/authme", authenticate, userControllers.authMe);

export default userRouter;
