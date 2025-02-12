import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { Configuration } from './config';
import { CustomValidationPipe } from './common/pipes';
import session from 'express-session';
import { COOKIE_NAME, __prod__ } from './common/constants';
import { redis } from './common/redis';
import { RedisStore } from 'connect-redis';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

declare module 'express-session' {
    interface SessionData {
        userId: number;
    }
}

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    // CONFIGURATION
    const config = app.get(ConfigService<Configuration>);
    const port = config.get('port');
    const client_url = config.get('client_url');
    const secret = config.get('secret');

    // VALIDATION
    app.useGlobalPipes(new CustomValidationPipe());

    // MIDDLEWARE
    // cors
    app.enableCors({
        origin: [client_url],
        credentials: true,
    });
    // session
    app.set('trust proxy', 1);
    app.use(
        session({
            name: COOKIE_NAME,
            secret,
            resave: false,
            cookie: {
                sameSite: 'lax',
                httpOnly: true,
                secure: __prod__,
                maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
            },
            store: new RedisStore({ client: redis }),
            saveUninitialized: false,
        }),
    );

    // Swagger
    const swaggerConfig = new DocumentBuilder()
        .setTitle('Leetcode API')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, document);

    await app.listen(port);
}
bootstrap();
