import { Injectable } from '@nestjs/common';
import { CredentialsDto } from './DTOs/credentials.dto';
import { MongoService } from './MongoDB/app.service';
import { Emailservice } from './Mailer/app.service';
import { DetailsDto } from './DTOs/details.dto';

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
      var attempts_updated : boolean = await this.mongoService.update_pending_user_attempts(details);
      var details_updated : boolean = await this.mongoService.update_pending_user_details(details);
      if( attempts_updated === true && details_updated === true ){  
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
      var attempts_inserted : boolean = await this.mongoService.insert_pending_user_attempts(details);
      var details_inserted : boolean = await this.mongoService.insert_pending_user_details(details);
      if( attempts_inserted === true && details_inserted === true ){  
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
  //harshverdhan4@gmail.com
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
        //await this.emailService.send_email(email);
        return {
          "status":100,
          "message":"User Found"
        };  
      }
    }catch{
      return {
        "status":900,
        "message":"Server Error"
      };
    }
  }
}  