import { Injectable } from '@nestjs/common';
import { CredentialsDto } from './DTOs/credentials.dto';
import { MongoService } from './MongoDB/app.service';
import { Emailservice } from './Mailer/app.service';

@Injectable()
export class AppService {

  constructor(private readonly mongoService: MongoService,
    private readonly emailService:Emailservice) {}
    

  async authenticate(obj:CredentialsDto):Promise<any>{
    return await this.mongoService.verify_user(obj);
  }

  async otp_resend():Promise<any>{
    
  }

  async otp_generator():Promise<any>{
    console.log("Generating OTP...");
    let otp=Math.round(Math.random()*1000000);
    console.log(otp);
    console.log("OTP Generated");
    return otp;
  }
}

//let otp=await this.appService.otp_generator();
//await this.mongoService.update_otp(email,otp);
//await this.mongoService.update_count(email,"WRONG");   
    