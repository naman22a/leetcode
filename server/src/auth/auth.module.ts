import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsersModule } from '../shared';
import { PassportModule } from '@nestjs/passport';
import { GithubStrategy } from './github.strategy';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'github' }),
        UsersModule,
    ],
    controllers: [AuthController],
    providers: [GithubStrategy],
})
export class AuthModule {}
