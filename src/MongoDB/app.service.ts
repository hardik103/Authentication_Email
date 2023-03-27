import { Inject, Injectable } from '@nestjs/common';
import { MongoClient} from 'mongodb';
import { DetailsDto } from 'src/DTOs/details.dto';
import { CredentialsDto } from 'src/DTOs/credentials.dto';

@Injectable()
export class MongoService {

  constructor(
    @Inject('DATABASE_CONNECTION')
    private connect: MongoClient,
  ) {}

  async verify_user(obj:CredentialsDto):Promise<any>{
    return await this.connect.db('user-registered').collection('credentials').findOne({"email":obj.email,"password":obj.password});
  }

  async find_user(email:string):Promise<any>{
    return await this.connect.db('user-registered').collection('credentials').findOne({"email":email});
  }

  async add_user(obj:DetailsDto):Promise<any>{
    return await this.connect.db('user-unregistered').collection('details').updateOne({"email":obj.email},{$set:{
      "email": obj.email,
      "mobile": obj.mobile,
      "first-name": obj.fname,
      "last-name": obj.lname,
      "gender": obj.gender,
      "sign-up": "",
      "sign-in": "",
      "user-no": 1
    }})
  }



  async update_count(email:string,attempt:string):Promise<any>{
    if (attempt == "WRONG")
    return await this.connect.db('demo-db').collection('demo-cl').updateOne({"email":email},{$inc:{"otp-verify":-1}});
    else if (attempt == "RESEND")
    return await this.connect.db('demo-db').collection('demo-cl').updateOne({"email":email},{$inc:{"otp-resend":-1}});
  }
  
}