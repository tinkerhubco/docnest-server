import config = require('config');
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'app/app.module';

async function bootstrap() {
  const port: number = config.get('port');
  const nestApplication = await NestFactory.create(AppModule);

  await nestApplication.listen(port);
  console.log(`server listening at http://localhost:${port}`);
}

bootstrap();
