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
}
