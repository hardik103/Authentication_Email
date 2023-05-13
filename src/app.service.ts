import { Injectable } from '@nestjs/common';
import { CredentialsDto } from './DTOs/credentials.dto';
import { MongoService } from './MongoDB/app.service';
import { Emailservice } from './Mailer/app.service';
import { DetailsDto } from './DTOs/details.dto';
import { OtpDto } from './DTOs/otp.dto';

@Injectable()
export class AppService {

  constructor(private readonly mongoService: MongoService,
    private readonly emailService:Emailservice) {}

    //.............................................................................................................................

  async details_passed(details : DetailsDto) : Promise<any> {
    try{
    if( await this.mongoService.user_sign_up_completed(details.email) ){
      return {
        "status":920,
        "message":"User Already Signed Up"
      };
    }else if( await this.mongoService.user_sign_up_incompleted(details.email) ){
      var attempts_updated = await this.mongoService.update_pending_user_attempts(details);
      var details_updated = await this.mongoService.update_pending_user_details(details);
      if( attempts_updated.acknowledged && details_updated.acknowledged ){  
        return {
            "status":921,
            "message":"User Updated"
          };
      }else{
        return {
          "status":922,
          "message":"User not Updated"
        };
      }
    }else{
      var attempts_inserted = await this.mongoService.insert_pending_user_attempts(details);
      var details_inserted = await this.mongoService.insert_pending_user_details(details);
      if( attempts_inserted.acknowledged && details_inserted.acknowledged ){  
        return {
        "status":923,
        "message":"User Generated"
      };
      }else{
        return {
          "status":924,
          "message":"User not Generated"
        };
      }
    } 
  }catch{
    return {
      "status":900,
      "message":"Server Error"
    };
  }
  }
  
  //................................................................................................................................

  async credentials_passed(credentials:CredentialsDto) :Promise<any> {
    try{
      if( await this.mongoService.user_credentials_match(credentials) ){
        return {
          "status":100,
          "message":"User Found"
        };  
      }else if( await this.mongoService.user_sign_up_completed(credentials.email)){
        return {
          "status":101,
          "message":"Incorrect Password"
        };
      }else{
        return {
          "status":102,
          "message":"User Not Found"
        };  
      }
    }catch{
      return {
        "status":900,
        "message":"Server Error"
      };
    }
  }

  //................................................................................................................................

  async email_passed( email : string ) : Promise<any> {
    try{
      if( !await this.mongoService.user_sign_up_completed(email)) {
        return {
          "status":102,
          "message":"User Not Found"
        };  
      }else{
        var attempts = await this.mongoService.fetch_resend_count(email);
        if( attempts['otp-resend'] > 0 ){
          await this.mongoService.update_resend_count(email);
          var otp = await this.emailService.send_email(email);
          await this.mongoService.update_otp(email,otp);
          return {
            "status":100,
            "message":"OTP Sent"
          };
        }else{
          return {
            "status":0,
            "message":"Daily OTP Limit Exceeded"
          };
        }
      }
    }catch{
      return {
        "status":900,
        "message":"Server Error"
      };
    }
  }

  //..............................................................................................................................

  async otp_passed( verificator : OtpDto ) : Promise<any> {
    try{
      var info = await this.email_passed( verificator.email );
      if( info.status == 100 ){

        //getting recent info
        var attempts = await this.mongoService.fetch_attempts(verificator.email);
        var details = await this.mongoService.fetch_details(verificator.email);

        //deleting from unregisrtered database
        await this.mongoService.delete_attempts(verificator.email);
        await this.mongoService.delete_details(verificator.email);

        //inserting in registered users
        var bool1 = await this.mongoService.reinsert_attempts(attempts);
        var bool2 = await this.mongoService.reinsert_details(details);
        var bool3 = await this.mongoService.reinsert_credentials({
          "email":verificator.email,
          "password":verificator.password
        });

        if( bool1.acknowledged && bool2.acknowledged && bool3.acknowledged ){
          return {
            "status":0,
            "message":"Signed Up"
          };
        }else{
          return {
            "status":0,
            "message":"Unknown Error"
          };
        }
      }else{
        return info; 
      }
    }catch{
      return {
        "status":900,
        "message":"Server Error"
      };
    }
  }
}  