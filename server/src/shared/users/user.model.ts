import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'users' })
export class User {
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

    @Property()
    createdAt = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date();
}
