import { BadRequestError, NotFoundError } from "@/core/errors/http.error";

import { IEmployeeCreationRepository } from "../../domain/contracts/employeeCreation.repository.interface";
import { CreateEmployeeDto } from "../../infra/dto/create.dto";

export class employeeCreationService {
  constructor(private readonly repo: IEmployeeCreationRepository) {}

  async employeeCreation(dto: CreateEmployeeDto) {
    const employeeExist = await this.repo.findEmail(dto.contact_details.email);

    if (employeeExist.length > 0)
      throw new BadRequestError("Employee already exist");

    const emp_id = "EMP_" + Math.floor(Math.random() * 100);

    await this.repo.create({
      emp_id: emp_id,
      ...dto,
    });

    const employeeLoginDetailsExist = await this.repo.findEmployeeLoginDetails(
      dto.contact_details.email
    );

    if (employeeLoginDetailsExist.length > 0)
      throw new BadRequestError(
        "Employee login details already exist use the old credentials to login"
      );

    const password = "EMP_user@" + Math.floor(Math.random() * 10000);

    const employeeLogin = {
      username: dto.full_name,
      email: dto.contact_details.email,
      mobile_number: dto.contact_details.phone,
      role: "user",
      country: "India",
      state: dto.permanent_address.state,
      city: dto.permanent_address.city,
      pincode: dto.permanent_address.pincode,
      password: password,
    };

    await this.repo.employeeLoginCreation(employeeLogin);

    return;
  }
}
