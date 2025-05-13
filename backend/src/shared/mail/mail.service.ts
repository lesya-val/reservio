import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as nodemailer from "nodemailer";
import { SentMessageInfo, Options } from "nodemailer/lib/smtp-transport";

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter<SentMessageInfo, Options>;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: this.configService.get<string>("EMAIL_USER"),
        pass: this.configService.get<string>("EMAIL_PASSWORD"),
      },
    });
  }

  async sendTemporaryPasswordEmail(
    to: string,
    temporaryPassword: string,
    employeeData: {
      name: string;
      surname: string;
      email: string;
    }
  ): Promise<void> {
    const mailOptions = {
      from: this.configService.get<string>("EMAIL_USER"),
      to,
      subject: "Reservio",
      html: `
        <h2>
          Уважаемый(-ая) ${employeeData.name} ${employeeData.surname}, вы успешно зарегистрированы в системе управления бронированиями Reservio!
        </h2>
        <p style="font-size: 18px;"><br>Ваши данные для авторизации:</p>
        <p style="font-size: 16px;">Логин: <strong style="font-weight: 600;">${employeeData.email}</strong></p>
        <p style="font-size: 16px;">Пароль: <strong style="font-weight: 600;">${temporaryPassword}</strong></p>
        <p style="font-size: 14px;"><br>Установить постоянный пароль можно будет при первом входе в систему</p>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log("Письмо успешно отправлено!");
    } catch (error) {
      console.error("Ошибка при отправке письма:", error);
      throw new Error("Не удалось отправить письмо");
    }
  }
}
