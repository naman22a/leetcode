import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { CreateSubmissionDto } from './types';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthGuard } from '../../auth/auth.guard';
import { Request } from 'express';
import { v4 } from 'uuid';

@UseGuards(AuthGuard)
@Controller('submissions')
export class SubmissionsController {
    constructor(
        private submissionsService: SubmissionsService,
        private prisma: PrismaService,
    ) {}

    @Get(':id')
    async findAllSubmissions(
        @Param('id', ParseIntPipe) id: number,
        @Req() req: Request,
    ) {
        return await this.prisma.submission.findMany({
            where: { problemId: id, userId: req.session.userId! },
        });
    }

    @Post(':id')
    async createSubmission(
        @Req() req: Request,
        @Body() body: CreateSubmissionDto,
        @Param('id', ParseIntPipe) id: number,
    ) {
        const { code, language } = body;

        try {
            const problem = await this.prisma.problem.findUnique({
                where: { id },
            });

            const results = await this.submissionsService.runTestCases(
                language,
                code,
                JSON.parse(problem?.testCases as string) as {
                    input: string;
                    output: string;
                }[],
            );

            let correct = true;
            for (const result of results) {
                correct = correct && result.success;
            }

            await this.prisma.submission.create({
                data: {
                    id: v4(),
                    code,
                    language,
                    status: correct ? 'AC' : 'WA',
                    userId: req.session.userId!,
                    problemId: id,
                },
            });

            return results;
        } catch (error) {
            console.error(error);
            return [{ success: false, output: error.toString() }];
        }
    }
}
