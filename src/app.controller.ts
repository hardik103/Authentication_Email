import { Controller, Get, Post, Req, Res, Param ,Query,Body} from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';
import { MongoService } from './MongoDB/app.service';
import { Emailservice } from './Mailer/app.service';
import { DetailsDto } from './DTOs/details.dto';
import { OtpDto } from './DTOs/otp.dto';
import { CredentialsDto } from './DTOs/credentials.dto';
import { ResetDto } from './DTOs/reset.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly mongoService: MongoService,
    private readonly emailService:Emailservice) {}
    
    @Get('direct')
    async render_guide_page( @Res() response_out: Response ) {
      //response_out.sendFile(https.get())
      const caller = new XMLHttpRequest();
      caller.open('GET','https://first-demo-bucket-103.s3.ap-south-1.amazonaws.com/home.html')
  //response_out.location('https://first-demo-bucket-103.s3.ap-south-1.amazonaws.com/home.html');
  //response_out.redirect('https://first-demo-bucket-103.s3.ap-south-1.amazonaws.com/home.html');
}

  @Get('home')
  async render_working_page(@Res() response_out: Response) {
    response_out.sendFile(process.cwd()+'/Interface/sign-up.html');
  }

  @Post('generate')
  async sign_up(@Body() details : DetailsDto, @Res() response_out: Response) :Promise<any>{
    console.log(details);
    try{
      if( !details || ( !details.email && !details.fname ) ){
        response_out.json({
          "status":911,
          "message":"Email and First Name Missing"
        });
      }else if( !details.fname ){
        response_out.json({
          "status":912,
          "message":"First Name Missing"
        });
      }else if( !details.email ){
        response_out.json({
          "status":913,
          "message":"Email Missing"
        });
      }else{
        response_out.json( await this.appService.details_passed(details));
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
        response_out.json(await this.appService.credentials_passed(credentials));
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
        response_out.json(await this.appService.email_passed(reset.email) );
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
  

}