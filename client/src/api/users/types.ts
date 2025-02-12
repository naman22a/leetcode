enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER'
}

export interface IUser {
    id: number;
    username: string;
    email: string;
    profile?: string;
    bio?: string;
    role: Role;
    createdAt: string;
    updatedAt: string;
}

export type User = IUser | null;
