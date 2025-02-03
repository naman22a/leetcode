import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ProblemsService {
    constructor(private prisma: PrismaService) {}

    async findAll() {
        return await this.prisma.problem.findMany();
    }

    async findOneById(id: number) {
        return await this.prisma.problem.findUnique({
            where: { id },
            include: {
                boilerPlate: true,
            },
        });
    }
}
