import { Migration } from '@mikro-orm/migrations';

export class Migration20250202151924 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "users" ("id" serial primary key, "username" varchar(255) not null, "email" varchar(255) not null, "profile" varchar(255) null, "bio" varchar(255) null, "created_at" timestamptz not null, "updated_at" timestamptz not null);`);
    this.addSql(`alter table "users" add constraint "users_email_unique" unique ("email");`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "users" cascade;`);
  }

}
