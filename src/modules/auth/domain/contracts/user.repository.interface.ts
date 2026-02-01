import { UpdateDto } from "../../infra/dto/update.dto";
import { user } from "../entities/user.entity";

export interface IUserRepository {
  Register(userData: user): Promise<void>;
  findEmail(email: string): any;
  updateUser(dto: UpdateDto): Promise<void>;
}
