import { EmployeeModel } from "./model/employeeCreation.model";
import { IEmployeeCreationRepository } from "../../domain/contracts/employeeCreation.repository.interface";
import { CreateEmployeeDto } from "../../infra/dto/create.dto";
import { LoginModel } from "./model/login.model";

export class employeeRespository implements IEmployeeCreationRepository {
  constructor(
    private readonly employeeModel = EmployeeModel,
    private readonly loginModel = LoginModel
  ) {}

  public findEmail(email: string) {
    return this.findExistingEmployeeByMail(email);
  }

  private async findExistingEmployeeByMail(email: string) {
    return await this.employeeModel.find({ "contact_details.email": email });
  }

  public create(dto: CreateEmployeeDto): any {
    return this.employeeRegister(dto);
  }

  private async employeeRegister(dto: CreateEmployeeDto) {
    const employeeRegister = new this.employeeModel({
      emp_id: dto.emp_id,
      full_name: dto.full_name,
      gender: dto.gender,
      date_of_birth: dto.date_of_birth,
      nationality: dto.nationality,

      contact_details: {
        phone: dto.contact_details.phone,
        email: dto.contact_details.email,
        alt_email: dto.contact_details.alt_email,
      },

      work_information: {
        department: dto.work_information.department,
        designation: dto.work_information.designation,
        work_mode: dto.work_information.work_mode,
        date_joined: dto.work_information.date_joined,
      },

      bank_information: {
        bank_name: dto.bank_information.bank_name,
        account_number: dto.bank_information.account_number,
        ifsc_code: dto.bank_information.ifsc_code,
      },

      present_address: {
        street: dto.present_address.street,
        area: dto.present_address.area,
        city: dto.present_address.city,
        district: dto.present_address.district,
        state: dto.present_address.state,
        pincode: dto.present_address.pincode,
      },

      permanent_address: {
        street: dto.present_address.street,
        area: dto.present_address.area,
        city: dto.present_address.city,
        district: dto.present_address.district,
        state: dto.present_address.state,
        pincode: dto.permanent_address.pincode,
      },

      health_information: {
        blood_group: dto.health_information.blood_group,
        medical_conditions: dto.health_information.medical_conditions,
        allergies: dto.health_information.allergies,
      },

      emergency_contact: {
        name: dto.emergency_contact.name,
        relation: dto.emergency_contact.relation,
        phone: dto.emergency_contact.phone,
      },
    });
    return await employeeRegister.save();
  }

  public employeeLoginCreation(data: any) {
    return this.employeeLoginDetails(data);
  }

  private async employeeLoginDetails(userData: any) {
    const employeeDetails = new this.loginModel({
      username: userData.username,
      email: userData.email,
      mobile_number: userData.mobile_number,
      role: userData.role,
      country: userData.country,
      state: userData.state,
      city: userData.city,
      pincode: userData.pincode,
      password: userData.password,
    });
    return await employeeDetails.save();
  }

  public findEmployeeLoginDetails(email: string) {
    return this.findEmployeeLoginDetailsExsits(email);
  }

  private async findEmployeeLoginDetailsExsits(email: string) {
    return await this.loginModel.find({ email });
  }
}
