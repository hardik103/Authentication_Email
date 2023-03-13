import { Controller, Get, Post, Res, Param ,Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';
import { MongoService } from './MongoDB/app.service';
import { Emailservice } from './Mailer/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly mongoService: MongoService,
    private readonly emailService:Emailservice) {}

  @Get()
  async find_user(): Promise<any> {
    return await "hi hello";
  }
  
  @Get('home')
  async homepage(@Res() render: Response ) {
    render.sendFile(process.cwd()+'/HTML/home.html');
  }
  
  @Get('search')
  async demo(): Promise<any> {
    return await this.mongoService.demo_data();
  }

  @Get('find')
  async demo_2(): Promise<any> {
    return await this.mongoService.find_user();
  }

  @Get('mail')
  async send_mail(@Query('email') email: string,@Res() render: Response) :Promise<any>{
    let otp=await this.appService.otp_generator();
    //await this.emailService.plainTextEmail(email,otp);
    await this.mongoService.update_otp(email,otp);
    //await this.mongoService.update_count(email,"WRONG");
    render.sendFile(process.cwd()+'/HTML/otp.html');
  }

  @Get('verify')
  async verify_otp(@Query('otp') otp: string,@Res() render?: Response) :Promise<any>{
    //await this.mongoService.verify_user();
    
    render.end();
  }
}