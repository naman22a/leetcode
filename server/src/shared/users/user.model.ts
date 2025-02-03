import {
    Entity,
    Enum,
    OptionalProps,
    PrimaryKey,
    Property,
} from '@mikro-orm/core';

enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER',
}

@Entity({ tableName: 'users' })
export class User {
    [OptionalProps]?: 'createdAt' | 'updatedAt' | 'role';

    @PrimaryKey()
    id: number;

    @Property()
    username: string;

    @Property({ unique: true })
    email: string;

    @Property({ nullable: true })
    profile?: string;

    @Property({ nullable: true })
    bio?: string;

    @Enum({ items: () => Role, default: Role.USER })
    role: Role;

    @Property()
    createdAt = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date();
}
