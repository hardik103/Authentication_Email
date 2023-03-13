import { Injectable, Inject } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { MongoService } from 'src/MongoDB/app.service';
@Injectable()
export class Emailservice {

  constructor(private mailService: MailerService,
    private readonly mongoService: MongoService) {}

  async plainTextEmail(email:string,otp:number):Promise<any>{
    console.log("Sending Email...");
    await this.mailService.sendMail({
     to: email,
     from: process.env.SENDER_EMAIL,
     subject: `Hardy.com Login OTP`,
     text: `Hi,\nYour OTP to login to Hardy.com is ${otp}`,
    });
    console.log("Email Sent");
    return;
  };

}