import { Controller, Get, Req, Res} from '@nestjs/common';
import { Request, Response } from 'express';

@Controller()
export class AppController {

  @Get('welcome')
  async render_working_page( @Req() request_in : Request, @Res() response_out: Response) {
    //response_out.redirect('https://authentication-interface.s3.ap-south-1.amazonaws.com/verification.html');
    //response_out.cookie('email','hardikpandey9244');
    response_out.sendFile(process.cwd()+'/Interface/welcome.html');
  }

  @Get('sign-in')
  async render_sign_in( @Req() request_in : Request, @Res() response_out: Response) {
    response_out.sendFile(process.cwd()+'/Interface/sign-in.html');
  }

  @Get('sign-up')
  async render_sign_up( @Req() request_in : Request, @Res() response_out: Response) {
    response_out.sendFile(process.cwd()+'/Interface/sign-up.html');
  }

  @Get('verify-email')
  async render_verify_email( @Req() request_in : Request, @Res() response_out: Response) {
    response_out.sendFile(process.cwd()+'/Interface/verification.html');
  }
}