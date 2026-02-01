import { LoginModel } from "./login.model";
import { IUserRepository } from "../../domain/contracts/user.repository.interface";
import { UpdateDto } from "../../infra/dto/update.dto";
import { user } from "../../domain/entities/user.entity";

export class userRepository implements IUserRepository {
  constructor(private readonly loginModel = LoginModel) {}

  public async Register(userData: user): Promise<void> {
    await this.registerUserRepo(userData);
  }

  private async registerUserRepo(userData: user) {
    const userDetails = new this.loginModel({
      username: userData.username,
      email: userData.email,
      mobile_number: userData.mobile_number,
      role : userData.role,
      country: userData.country,
      state: userData.state,
      city: userData.city,
      pincode: userData.pincode,
      password: userData.password,
    });
    return await userDetails.save();
  }

  public findEmail(email: string) {
    return this.findUserDetailsByMail(email);
  }

  private async findUserDetailsByMail(email: string) {
    return await this.loginModel.find({ email });
  }

  public updateUser(dto: UpdateDto): Promise<void> {
    return this.updateUserDetails(dto);
  }

  private async updateUserDetails(dto: UpdateDto) {}
}
