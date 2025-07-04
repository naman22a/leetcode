import {
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Query,
    UseGuards,
} from '@nestjs/common';
import { ProblemsService } from './problems.service';
import { AuthGuard } from '../../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('problems')
export class ProblemsController {
    constructor(private problemsService: ProblemsService) {}

    @Get()
    async findAll(
        @Query('page', ParseIntPipe) page = 1,
        @Query('limit', ParseIntPipe) limit = 10,
    ) {
        return await this.problemsService.findAll(page, limit);
    }

    @Get(':id')
    async findOneById(@Param('id', ParseIntPipe) id: number) {
        return await this.problemsService.findOneById(id);
    }
}
