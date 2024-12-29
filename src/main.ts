import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // security middlewares
  app.enableCors();
  app.use(helmet());

  // Validation
  app.useGlobalPipes(new ValidationPipe({ disableErrorMessages: false }));

  // OpenAPI Specification
  const config = new DocumentBuilder()
    .setTitle('Products Demo API')
    .setDescription(
      'A REST API using Nestjs to create CRUD operations on products table',
    )
    .setVersion('1.0')
    .addTag('products')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.API_PORT || 5000);
}
bootstrap();

/* 
MYSQL_ROOT_PASSWORD=admin
MYSQL_USER=user
MYSQL_PASSWORD=12345
MYSQL_PORT=3306
API_PORT=3000
MYSQL_HOST=localhost
MYSQL_DATABASE=products_db
PORT=3306

*/
