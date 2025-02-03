import {
    Controller,
    Get,
    Param,
    ParseIntPipe,
    UseGuards,
} from '@nestjs/common';
import { ProblemsService } from './problems.service';
import { AuthGuard } from '../../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('problems')
export class ProblemsController {
    constructor(private problemsService: ProblemsService) {}

    @Get()
    async findAll() {
        return await this.problemsService.findAll();
    }

    @Get(':id')
    async findOneById(@Param('id', ParseIntPipe) id: number) {
        return await this.problemsService.findOneById(id);
    }
}
