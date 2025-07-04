import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ProblemsService {
    constructor(private prisma: PrismaService) {}

    async findAll(page: number, limit: number) {
        const skip = (page - 1) * limit;

        const [problems, totalCount] = await Promise.all([
            this.prisma.problem.findMany({
                skip,
                take: limit,
            }),
            this.prisma.problem.count(),
        ]);

        return {
            data: problems,
            meta: {
                totalCount,
                totalPages: Math.ceil(totalCount / limit),
                currentPage: page,
            },
        };
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
