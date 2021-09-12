import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import helmet from 'fastify-helmet';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.useGlobalPipes(new ValidationPipe());
  app.register(helmet);
  app.enableCors({ origin: process.env.CORS_ORIGIN || '*' });

  app.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
      },
    },
  });

  const config = new DocumentBuilder()
    .setTitle('Twitter API')
    .setDescription(
      'Documentação do backend do Twitter, utilizado no Formação Frontend Expert',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .setContact(
      'Daniel Berg',
      'https://maratonas.academy/',
      'daniel@maratonas.academy',
    )
    .setExternalDoc(
      'GitHub do backend',
      'https://github.com/daniel-bergholz/twitter-backend',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
  };

  SwaggerModule.setup('docs', app, document, customOptions);

  await app.listen(process.env.PORT || 3000, '0.0.0.0');
}

bootstrap();
