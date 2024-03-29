import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ConfigService } from '@nestjs/config';

async function start() {
  const app = await NestFactory.create(AppModule);
  const port = app.get(ConfigService).get('port');
  await app.listen(port, () => console.log(`Server started on port ${port}`));
}
start();
