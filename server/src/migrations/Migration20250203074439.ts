import { Migration } from '@mikro-orm/migrations';

export class Migration20250203074439 extends Migration {
    override async up(): Promise<void> {
        this.addSql(
            `alter table "users" add column "role" text check ("role" in ('ADMIN', 'USER')) not null default 'USER';`,
        );
    }

    override async down(): Promise<void> {
        this.addSql(`alter table "users" drop column "role";`);
    }
}
