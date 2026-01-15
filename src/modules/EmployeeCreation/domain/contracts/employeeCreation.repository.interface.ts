import { CreateEmployeeDto } from "../../infra/dto/create.dto";

export interface IEmployeeCreationRepository {
  create(dto: CreateEmployeeDto): any;
  findEmail(email: string): any;
  employeeLoginCreation(data: any): any;
  findEmployeeLoginDetails(email: string): any;
  getAllEmployeeDetails(): any;
  getEmployeeDetailsById(emp_id: string): any;
}
