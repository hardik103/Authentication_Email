import { Controller, Get, Post, Req, Res, Param ,Query} from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';
import { MongoService } from './MongoDB/app.service';
import { Emailservice } from './Mailer/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly mongoService: MongoService,
    private readonly emailService:Emailservice) {}
  
  @Get('home')
  async homepage(@Res() render: Response ) {
    render.clearCookie('email');
    render.sendFile(process.cwd()+'/HTML/home.html');
  }

  @Get('sign_up')
  async render_sign_in(@Res() response_out: Response) {
    response_out.sendFile(process.cwd()+'/HTML/sign-up.html');
  }

  @Get('sign_in')
  async render_sign_up(@Res() response_out: Response) {
    response_out.sendFile(process.cwd()+'/HTML/sign-in.html');
  }

  @Get('mail')
  async send_mail(@Req() request_in:Request, @Query('email') email: string,@Res() render: Response) :Promise<any>{
    //let otp=await this.appService.otp_generator();
    //await this.emailService.plainTextEmail(email,otp);
    //await this.mongoService.update_otp(email,otp);
    //await this.mongoService.update_count(email,"WRONG");   
    //render.setHeader('email',email);
    //render.clearCookie('hi=hello;');
    render.cookie('email',email);
    render.sendFile(process.cwd()+'/HTML/verification.html');
  }

  @Get('verify')
  async verify_otp(@Req() request_in:Request, @Query('otp') otp: string, @Res() response_out: Response) :Promise<any>{
    //await this.mongoService.verify_user();
    
    console.log(request_in.cookies.emai);
    response_out.end();
    //response_out.sendFile(process.cwd()+'/HTML/home.html');
  }
}

//console.log(request_in.cookies);
//render.clearCookie(email);
//console.log(request_in.cookies.email);