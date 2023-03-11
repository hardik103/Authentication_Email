import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  let port=process.env.LOCAL_HOST_PORT;
  await app.listen(port);
  console.log(`server is up at http://localhost:${port}/home`)
}
bootstrap();
