import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: EntityRepository<User>,
        // @ts-ignore
        private readonly em: EntityManager,
    ) {}

    async findAll() {
        return await this.usersRepository.findAll();
    }
}
