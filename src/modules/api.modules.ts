import { Router } from "express";
import userRouter from "./auth/infra/http/user.route";
import employeeCreationRouter from "./EmployeeCreation/infra/http/employeeCreation.route";
const apiRouter = Router();

apiRouter.use("/user", userRouter);
apiRouter.use("/employee", employeeCreationRouter);

export default apiRouter;
