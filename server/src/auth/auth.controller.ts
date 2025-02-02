import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { UsersService } from '../shared';

@Controller('auth')
export class AuthController {
    constructor(private usersService: UsersService) {}

    @Get('github')
    @UseGuards(PassportAuthGuard('github'))
    async githubLogin() {}

    @Get('github/callback')
    @UseGuards(PassportAuthGuard('github'))
    async githubCallback(@Req() req: Request, @Res() res: Response) {
        const { email, username } = req.user as {
            id: string;
            username: string;
            email: string;
            avatar: string;
            accessToken: string;
        };

        // check if user already exists
        const userExists = await this.usersService.findOneByEmail(email);
        if (userExists) {
            req.session.userId = userExists.id;
            return res.redirect(process.env.CLIENT_URL);
        }

        // save user to database
        const user = await this.usersService.create({
            username,
            email,
        });

        req.session.userId = user.id;
        res.redirect(process.env.CLIENT_URL);
    }
}
