import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configuration, validate } from './config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

// Modules
import { UsersModule } from './shared';
import { ProblemsModule } from './modules';

@Module({
    imports: [
        ConfigModule.forRoot({
            cache: true,
            isGlobal: true,
            expandVariables: true,
            load: [configuration],
            validate,
        }),
        PrismaModule,
        AuthModule,

        // Modules
        UsersModule,
        ProblemsModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
