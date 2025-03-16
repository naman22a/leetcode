import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './types';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async findAll() {
        return await this.prisma.user.findMany();
    }

    async findOneById(id: number) {
        return await this.prisma.user.findUnique({ where: { id } });
    }

    async findOneByUsername(username: string) {
        return await this.prisma.user.findUnique({
            where: { username },
            include: { submissions: true },
        });
    }

    async findOneByEmail(email: string) {
        return await this.prisma.user.findUnique({ where: { email } });
    }

    async create(data: CreateUserDto) {
        return await this.prisma.user.create({ data });
    }
}
