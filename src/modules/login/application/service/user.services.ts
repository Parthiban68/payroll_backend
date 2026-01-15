import * as path from "node:path";
import * as fs from "node:fs";

import lib from "@/lib";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "@/core/errors/http.error";

import { user } from "../../domain/entities/user.entity";
import { CreateDto } from "../../infra/dto/create.dto";
import { LoginDto } from "../../infra/dto/login.dto";

import type { IUserRepository } from "../../domain/contracts/user.repository.interface";

export class userService {
  constructor(
    private readonly repo: IUserRepository,
    private readonly jwt: typeof lib.jwtServiceInstance,
    private readonly mailService: typeof lib.mailServiceInstance
  ) {}
  async registerUser(dto: CreateDto) {
    const userExist = await this.repo.findEmail(dto.email);

    if (userExist.length > 0) {
      throw new BadRequestError("Email already exist");
    }

    const userData = user.register({
      username: dto.username,
      email: dto.email,
      mobile_number: dto.mobile_number,
      role: dto.role,
      country: dto.country,
      state: dto.state,
      city: dto.city,
      pincode: dto.pincode,
      password: dto.password,
    });

    await this.repo.Register(userData);

    const templatePath = path.join(
      process.cwd(),
      "src",
      "shared",
      "html",
      "register.html"
    );
    const html = fs
      .readFileSync(templatePath, "utf8")
      .replace(/{{username}}/g, dto.username || "user");

    this.mailService
      .sendMail({
        to: dto.email,
        subject: "Account create successfully",
        html: html,
      })
      .catch(console.error);

    return;
  }

  async userLogin(dto: LoginDto) {
    const userDetails = await this.repo.findEmail(dto.email);

    if (!userDetails) throw new NotFoundError("provided email not found");

    if (userDetails[0].email !== dto.email)
      throw new UnauthorizedError("Invalid email or password");

    if (userDetails[0].password !== dto.password)
      throw new UnauthorizedError("Invalid email or password");

    const token = this.jwt.generateJwtToken({
      username: userDetails[0].username,
      email: userDetails[0].email,
    });

    return {
      token,
      user: {
        name: userDetails[0].username,
        email: userDetails[0].email,
        role: userDetails[0].role,
      },
    };
  }
}
