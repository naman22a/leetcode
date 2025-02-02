import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { Configuration } from './config';
import { CustomValidationPipe } from './common/pipes';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    // CONFIGURATION
    const config = app.get(ConfigService<Configuration>);
    const port = config.get('port');
    const client_url = config.get('client_url');

    // VALIDATION
    app.useGlobalPipes(new CustomValidationPipe());

    // MIDDLEWARE
    // cors
    app.enableCors({
        origin: [client_url],
        credentials: true,
    });

    await app.listen(port);
}
bootstrap();
