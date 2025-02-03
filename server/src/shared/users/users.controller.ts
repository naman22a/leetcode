import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../../auth/auth.guard';
import { Request } from 'express';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    async findAll(): Promise<User[]> {
        return await this.usersService.findAll();
    }

    @UseGuards(AuthGuard)
    @Get('me')
    async findMe(@Req() req: Request): Promise<User | null> {
        const userId = req.session.userId!;
        return await this.usersService.findOneById(userId);
    }
}
