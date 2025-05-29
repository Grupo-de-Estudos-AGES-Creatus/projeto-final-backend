import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // Cria o backend
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173', // A URL do frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
    allowedHeaders: 'Content-Type, Accept, Authorization', // Cabeçalhos permitidos
    credentials: true,
  });

  // Define para os pipes serem usado em todas rotas 
  app.useGlobalPipes(new ValidationPipe())

  // Configura o swagger para a documentação
  const config = new DocumentBuilder()
    .setTitle('Moodle grupo de estudos')
    .setDescription('The API description')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  // Configura qual porta o nest vai usar
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
