import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // initialize swagger
  const config = new DocumentBuilder()
    .setTitle('Tech Store API')
    .setDescription('The tech-store API e-commerce')
    .setVersion('1.0')
    .addTag('techstore')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  app.enableCors({});
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.useGlobalGuards();
  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();
