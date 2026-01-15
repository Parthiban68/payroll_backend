import nodemailer, { Transporter } from "nodemailer";
import { envConfig } from "@/config/env.config";

type MailOptions = {
  to: string;
  subject: string;
  html?: string;
};

class MailService {
  private readonly transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: envConfig.mail_details.email_id,
        pass: envConfig.mail_details.password,
      },
      pool: true,
      maxConnections: 5,
      maxMessages: 100,
      connectionTimeout: 10_000,
      greetingTimeout: 5_000,
      socketTimeout: 10_000,
    });
  }

  async sendMail(options: MailOptions): Promise<void> {
    await this.transporter.sendMail({
      from: "no-reply <no-reply@gmail.com>",
      ...options,
    });
  }
}

export const mailServiceInstance = new MailService();
