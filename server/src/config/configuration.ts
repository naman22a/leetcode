import { ConfigType } from '@nestjs/config';

const configuration = () => ({
    enviroment: process.env.NODE_ENV,
    port: parseInt(process.env.PORT!, 10) ?? 5000,
    client_url: process.env.CLIENT_URL,
    server_url: process.env.SERVER_URL,
    db_url: process.env.DATABASE_URL,
    redis_url: process.env.REDIS_URL,
});

export type Configuration = ConfigType<typeof configuration>;
export default configuration;
