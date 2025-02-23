import { IsEnum, IsNotEmpty } from 'class-validator';
import { Language } from '@prisma/client';

export class CreateSubmissionDto {
    @IsNotEmpty()
    code: string;

    @IsEnum(Language)
    language: Language;
}
