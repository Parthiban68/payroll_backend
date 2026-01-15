import { Router } from "express";
import userControllers from "./user.controllers";
import common from "@/common";
import { CreateDtoSchema } from "../dto/create.dto";
import { LoginDtoSchema } from "../dto/login.dto";

const userRouter = Router();

userRouter.post(
  "/register",
  common.validate(CreateDtoSchema),
  userControllers.userRegister
);

userRouter.post(
  "/login",
  common.validate(LoginDtoSchema),
  userControllers.userLogin
);

userRouter.post("/logout", userControllers.userLogout);

export default userRouter;
