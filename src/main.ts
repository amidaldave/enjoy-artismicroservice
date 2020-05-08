import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';

// Create new logger instance
const logger = new Logger('Main');

// Create micro service options
const microserviceOptions = {
  name: 'ARTIST_SERVICE',
  transport: Transport.REDIS,
  options: {
    url: 'redis://localhost:6379',
  },
};

async function bootstrap() {
  //const app = await NestFactory.create(AppModule);

  const app = await NestFactory.createMicroservice(
    AppModule,
    microserviceOptions,
  );

  /*const options = new DocumentBuilder()
    .setTitle('Enjoy Artist')
    .setDescription('The EnjoyArtist API')
    .setVersion('1.0')
    .addTag('artist')
    .build();
  const document = SwaggerModule.createDocument(, options);
  SwaggerModule.setup('api', this, document);*/

  app.listen(() => {
    logger.log('Artist microservice is listening ... ');
  });
  
  //await app.listen(3000);
}
bootstrap();
