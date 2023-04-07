import { Injectable, Inject } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { MongoService } from 'src/MongoDB/app.service';
@Injectable()
export class Emailservice {

  constructor(private mailService: MailerService,
    private readonly mongoService: MongoService) {}

  async send_email( email : string ) : Promise<any> {
    var otp = 0;
    console.log("Generating OTP...");
    do{
      otp=Math.round(Math.random()*1000000);

    }while( otp < 100000 )
    console.log("OTP Generated");
    console.log(otp);
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