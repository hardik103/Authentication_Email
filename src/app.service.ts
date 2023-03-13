import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  async otp_generator():Promise<any>{
    console.log("Generating OTP...");
    let otp=Math.round(Math.random()*1000000);
    console.log(otp);
    console.log("OTP Generated");
    return otp;
  }
}