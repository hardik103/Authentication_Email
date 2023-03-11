import { Controller, Get, Post, Res, Param ,Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';
import { MongoService } from './MongoDB/app.service';
import { Emailservice } from './Mailer/app.service';
import { dirname } from 'path/posix';
import { fileURLToPath, pathToFileURL } from 'url';
import path from 'path';

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
    render.sendFile(process.cwd()+'/src/home.html');
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
  async send_mail(@Query('email') email: string) :Promise<any>{
    return await this.emailService.plainTextEmail(email);//at9632
  }
}
