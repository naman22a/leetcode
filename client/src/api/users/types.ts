export interface IUser {
    id: number;
    username: string;
    email: string;
    profile?: string;
    bio?: string;
    createdAt: string;
    updatedAt: string;
}

export type User = IUser | null;
