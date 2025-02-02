declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production' | 'test' | 'provision';
            PORT: string;
            CLIENT_URL: string;
            SERVER_URL: string;
            DATABASE_URL: string;
            REDIS_URL: string;
            SESSION_SECRET: string;
            GITHUB_CLIENT_ID: string;
            GITHUB_CLIENT_SECRET: string;
        }
    }
}

export {};
