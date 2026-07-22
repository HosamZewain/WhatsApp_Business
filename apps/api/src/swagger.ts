import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function configureSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('WhatsApp Business API')
    .setDescription('Foundation API for the WhatsApp Business platform.')
    .setVersion('0.1.0')
    .addServer('http://localhost:3000')
    .build();

  SwaggerModule.setup('docs', app, SwaggerModule.createDocument(app, config));
}
