import { Controller, Get, Post, Req, Res, Param ,Query,Body} from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';
import { MongoService } from './MongoDB/app.service';
import { Emailservice } from './Mailer/app.service';
import { DetailsDto } from './DTOs/details.dto';
import { OtpDto } from './DTOs/otp.dto';
import { CredentialsDto } from './DTOs/credentials.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly mongoService: MongoService,
    private readonly emailService:Emailservice) {}
  
  @Get('home')
  async render_homepage(@Res() response_out: Response) {
    response_out.clearCookie('email');
    response_out.sendFile(process.cwd()+'/Interface/home.html');
  }

  @Get('sign_up')
  async render_sign_up(@Res() response_out: Response) {
    response_out.clearCookie('email');
    response_out.sendFile(process.cwd()+'/Interface/sign-up.html');
  }
  
  @Post('verify')
  async render_verify(@Req() request_in:Request,@Body() obj:DetailsDto,@Res() render: Response) :Promise<any>{
    //render.setHeader('email',email);
    //render.clearCookie('hi=hello;');
    render.clearCookie('email');
    render.sendFile(process.cwd()+'/Interface/verification.html');
  }

  @Get('verify')
  async verify_otp(@Req() request_in:Request, @Query('otp') otp: string, @Res() response_out: Response) :Promise<any>{
    //await this.mongoService.verify_user();
    
    console.log(request_in.cookies.emai);

    response_out.sendFile(process.cwd()+'/Interface/home.html');
    //response_out.sendFile(process.cwd()+'/HTML/home.html');
  }

  @Get('sign_in')
  async render_sign_in(@Res() response_out: Response) {
    response_out.clearCookie('email');
    response_out.sendFile(process.cwd()+'/Interface/sign-in.html');
  }

  @Post('authenticate')
  async render_website(@Body() obj:CredentialsDto,@Res() response_out: Response) {
    response_out.setHeader('content-type','text/html');
    if( !obj || ( !obj.email && !obj.password ) ){
      response_out.send(`<script>alert('Email and Password Missing');location.replace('http://localhost:${process.env.LOCAL_HOST_PORT}/sign_in');</script>`);
    }
    else if( !obj.email ){
      response_out.send(`<script>alert('Email Missing');location.replace('http://localhost:${process.env.LOCAL_HOST_PORT}/sign_in');</script>`);
    }
    else if( !obj.password ){
      response_out.send(`<script>alert('Password Missing');location.replace('http://localhost:${process.env.LOCAL_HOST_PORT}/sign_in');</script>`);
    }
    else{
      //cookies and webpage expected
      if( !await this.appService.authenticate(obj) ) 
      response_out.send(`<script>alert('User Not Signed Up');location.replace('http://localhost:${process.env.LOCAL_HOST_PORT}/sign_in');</script>`);
      else
      response_out.send(`<script>alert('User Found');location.replace('http://localhost:${process.env.LOCAL_HOST_PORT}/sign_in');</script>`);
    }
  }

}