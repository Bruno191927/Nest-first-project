import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function main() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //remueve la data q no necesita el dto
      forbidNonWhitelisted: true, //te manda error cuando mandas propiedades erroneas
    }),
  );
  await app.listen(3000);
}
main();
