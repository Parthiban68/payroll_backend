import jwt from "jsonwebtoken";
import * as fs from "node:fs";
import * as path from "node:path";

class jwtService {
  private readonly privateKey: string;

  constructor() {
    const privateKeyPath = path.join(
      process.cwd(),
      "src",
      "shared",
      "jwtkeys",
      "jwt.private.pem"
    );
    this.privateKey = fs.readFileSync(privateKeyPath, "utf8");
  }

  generateJwtToken(payload: object): string {
    return jwt.sign(payload, this.privateKey, {
      algorithm: "RS256",
      expiresIn: "1h",
      issuer: "ecommerce",
      audience: "user",
    });
  }
}

export const jwtServiceInstance = new jwtService();
