import { Request, Response, NextFunction } from "express";
import { employeeRespository } from "../../application/repositories/employeeCreation.repository";
import { employeeCreationService } from "../../application/service/employeeCreation.services";
import { success } from "zod";

class employeeCreationController {
  private readonly service: employeeCreationService;
  constructor() {
    const repo = new employeeRespository();
    this.service = new employeeCreationService(repo);
    this.employeeCreation = this.employeeCreation.bind(this);
  }

  async employeeCreation(req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(200).json({
        success: true,
        message: "Employee Created successfully",
        result: await this.service.employeeCreation(req.body),
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new employeeCreationController();
