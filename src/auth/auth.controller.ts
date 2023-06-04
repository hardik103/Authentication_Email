import { Controller, Get, Post, Req, Res, Param ,Query,Body} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { Request, Response } from 'express';
import { MongoService } from 'src/MongoDB/app.service';
import { Emailservice } from 'src/Mailer/app.service';
import { DetailsDto } from 'src/DTOs/details.dto';
import { OtpDto } from 'src/DTOs/otp.dto';
import { CredentialsDto } from 'src/DTOs/credentials.dto';
import { ResetDto } from 'src/DTOs/reset.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private readonly mongoService: MongoService,
    private readonly emailService:Emailservice) {}

  @Post('generate')
  async sign_up(@Body() details : DetailsDto, @Res() response_out: Response) :Promise<any>{
    try{
      if( !details || ( !details.email && !details.fname && !details.lname ) ){
        response_out.json({
          "status":991,
          "message":"Mandatory Data Missing"
        });
      }else if( !details.email && !details.fname ){
        response_out.json({
          "status":991,
          "message":"Email and First Name Missing"
        });
      }else if( !details.email &&  !details.lname ){
        response_out.json({
          "status":991,
          "message":"Email and Last Name Missing"
        });
      }else if( !details.fname && !details.lname ){
        response_out.json({
          "status":991,
          "message":"First Name and Last Name Missing"
        });
      }else if( !details.email ){
        response_out.json({
          "status":991,
          "message":"Email Missing"
        });
      }else if( !details.fname ){
        response_out.json({
          "status":991,
          "message":"First Name Missing"
        });
      }else if( !details.lname ){
        response_out.json({
          "status":991,
          "message":"Last Name Missing"
        });
      }else{
        response_out.json( await this.authService.details_passed(details) );
      }
    }catch{
      response_out.json({
        "status":999,
        "message":"Server Error"
      });
    }finally{
      console.log("....Generator API..............................");
    }   
  }

  //..........................................................................................................................

  @Post('register')
  async verify( @Body() verificator : OtpDto , @Res() response_out : Response ) : Promise<any> {
    try{
      if( !verificator || ( !verificator.otp && !verificator.email && !verificator.password ) ){
        response_out.json({
          "status":0,
          "message":"OTP, Email and Password Missing"
        });
      }else if( !verificator.otp && ( verificator.email && verificator.password ) ){
        response_out.json({
          "status":0,
          "message":"OTP Missing"
        });
      }else if( !verificator.email && ( verificator.otp && verificator.password ) ){
        response_out.json({
          "status":0,
          "message":"Email Missing"
        });
      }else if( !verificator.password && ( verificator.otp && verificator.email ) ){
        response_out.json({
          "status":0,
          "message":"Password Missing"
        });
      }else if( ( !verificator.otp && !verificator.email ) && verificator.password ){
        response_out.json({
          "status":0,
          "message":"OTP and Email Missing"
        });
      }else if( ( !verificator.otp && !verificator.password ) && verificator.email ){
        response_out.json({
          "status":0,
          "message":"OTP and Password Missing"
        });
      }else if( ( !verificator.email && !verificator.password ) && verificator.otp ){
        response_out.json({
          "status":0,
          "message":"Email and Password Missing"
        });
      }else{
        response_out.json( await this.authService.otp_passed(verificator) );
      }
    }catch{

    }
  }

  @Post('authenticate')
  async sign_in(@Body() credentials : CredentialsDto,@Res() response_out: Response) : Promise<any> {
    console.log(credentials);
    try{
      if( !credentials || ( !credentials.email && !credentials.password ) ){
        response_out.json({
          "status":991,
          "message":"Email and Password Missing"
        });
      }else if( !credentials.email ){
        response_out.json({
          "status":992,
          "message":"Email Missing"
        });
      }else if( !credentials.password ){
        response_out.json({
          "status":993,
          "message":"Password Missing"
        });
      }else{
        response_out.json(await this.authService.credentials_passed(credentials));
      }
    }catch{
      response_out.json({
        "status":999,
        "message":"Server Error"
      });
    }finally{
      console.log("...............................................");
    }
  }

  @Post('reset')
  async password_reset(@Body() reset : ResetDto, @Res() response_out : Response) : Promise<any> {
    console.log(reset);
    try{
      if( !reset || !reset.email ){
        response_out.json({
          "status":901,
          "message":"Email Missing"
        });
      }else{
        response_out.json(await this.authService.email_passed(reset.email) );
      }
    }catch{
      response_out.json({
        "status":999,
        "message":"Server Error"
      });
    }finally{
      console.log('..............................................');
    }
  }


  //........................................................................................

  @Get('working')
  async demo(){
    await this.mongoService.demo_func();
    return;
  }

  @Get('rename')
  async rename(){
    await this.mongoService.demo_rename();
    return;
  }

  @Get('remove')
  async remove(){
    await this.mongoService.demo_remove();
    return;
  }

}