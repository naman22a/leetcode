import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configuration, validate } from './config';
import { MikroOrmModule } from '@mikro-orm/nestjs';

// Modules
import { UsersModule } from './shared';

@Module({
    imports: [
        ConfigModule.forRoot({
            cache: true,
            isGlobal: true,
            expandVariables: true,
            load: [configuration],
            validate,
        }),
        MikroOrmModule.forRoot(),

        // Modules
        UsersModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
