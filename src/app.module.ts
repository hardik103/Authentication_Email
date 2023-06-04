import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConnector } from './MongoDB/app.connection';
import { MongoService } from './MongoDB/app.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { Emailservice } from './Mailer/app.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [ConfigModule.forRoot(),DatabaseConnector,
    MailerModule.forRoot({
      transport: {
        host: process.env.SENDER_HOST,
        port: process.env.SENDER_PORT,
        auth: {
          user: process.env.SENDER_EMAIL,
          pass: process.env.SENDER_PASSWORD,
        }
      }
    })],
  controllers: [AppController,AuthController],
  providers: [AppService,AuthService,MongoService,Emailservice],
})
export class AppModule {}
