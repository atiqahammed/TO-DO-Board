import { NestFactory } from '@nestjs/core';
import { AppModule } from './controllers/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle('To Do Service')
        .setDescription('The To Do API description')
        .setVersion('1.0')
        .addTag('to-do')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    const PORT = process.env.PORT || 4500;
    await app.listen(PORT);
}
bootstrap();
