import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configuration, validate } from './config';

@Module({
    imports: [
        ConfigModule.forRoot({
            cache: true,
            isGlobal: true,
            expandVariables: true,
            load: [configuration],
            validate,
        }),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
