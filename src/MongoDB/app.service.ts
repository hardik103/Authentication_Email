import { Inject, Injectable } from '@nestjs/common';
import { MongoClient} from 'mongodb';

@Injectable()
export class MongoService {

  constructor(
    @Inject('DATABASE_CONNECTION')
    private connect: MongoClient,
  ) {}

  async demo_data():Promise<any>{
    return await this.connect.db('user-existing').collection('user-details').find({}).toArray();
  }

  async find_user():Promise<any>{
    return await this.connect.db('user-existing').collection('user-details').find({"mobile":"+919695710487"}).toArray();
  }

  async update_otp(email:string,otp:number):Promise<any>{
    return await this.connect.db('demo-db').collection('demo-cl').updateOne({"email":email},{$set:{"otp":otp}});
  }

  async update_count(email:string,attempt:string):Promise<any>{
    if (attempt == "WRONG")
    return await this.connect.db('demo-db').collection('demo-cl').updateOne({"email":email},{$inc:{"otp-verify":-1}});
    else if (attempt == "RESEND")
    return await this.connect.db('demo-db').collection('demo-cl').updateOne({"email":email},{$inc:{"otp-resend":-1}});
  }
  
}
