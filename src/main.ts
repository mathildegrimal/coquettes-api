import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupAdminPanel } from './admin-panel/admin-panel.plugin';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await setupAdminPanel(app);
  const config = new DocumentBuilder()
    .setTitle('Coquette de Sète')
    .setDescription("Description de l'api des coquettes de sète")
    .setVersion('1.0')
    .addTag('coquette')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
