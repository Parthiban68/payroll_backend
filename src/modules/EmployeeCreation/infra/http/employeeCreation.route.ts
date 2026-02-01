import { Router } from "express";
import employeeCreationControllers from "./employeeCreation.controllers";
import common from "@/common";
import { CreateEmployeeDtoSchema } from "../dto/create.dto";

const employeeCreationRouter = Router();

employeeCreationRouter.post(
  "/creation",
  common.commonMiddleware(CreateEmployeeDtoSchema),
  employeeCreationControllers.employeeCreation
);

export default employeeCreationRouter;
