import { plainToInstance } from 'class-transformer';
import {
    IsEnum,
    IsNotEmpty,
    IsNumber,
    Matches,
    Max,
    Min,
    validateSync,
} from 'class-validator';

enum Environment {
    Development = 'development',
    Production = 'production',
    Test = 'test',
    Provision = 'provision',
}

export class EnvironmentVariables {
    @IsEnum(Environment)
    NODE_ENV: Environment;

    @IsNumber()
    @Min(0)
    @Max(65536)
    PORT: number;

    @IsNotEmpty()
    CLIENT_URL: string;

    @IsNotEmpty()
    SERVER_URL: string;

    @Matches(
        /^postgresql:\/\/([^:]+):([^@]+)@([^:\/]+):(\d+)\/([^?]+)\?schema=([^&]+)$/,
    )
    DATABASE_URL: string;

    @IsNotEmpty()
    REDIS_URL: string;
}

export function validate(config: Record<string, unknown>) {
    const validatedConfig = plainToInstance(EnvironmentVariables, config, {
        enableImplicitConversion: true,
    });
    const errors = validateSync(validatedConfig, {
        skipMissingProperties: false,
    });

    if (errors.length > 0) {
        throw new Error(errors.toString());
    }
    return validatedConfig;
}
