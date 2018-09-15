import { EntityRepository, Repository } from 'typeorm';

import { User } from '../entities';
import { Filter } from '../../shared';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async exists(user: User) {
    if (!user || !user.id) return false;
    return !!(await this.findOne(user.id, {
      select: ['id']
    }));
  }

  async getUsers(
    sort: string,
    order: 'ASC' | 'DESC',
    limit: number,
    offset: number,
    search: string
  ) {
    return this.createQueryBuilder('user')
      .where(
        `((user.id)::text LIKE :search OR
          user.firstName LIKE :search OR
          user.middleName LIKE :search OR
          user.lastName LIKE :search OR
          user.email LIKE :search)`,
        { search }
      )
      .orderBy(sort, order)
      .limit(limit)
      .offset(offset)
      .getMany();
  }

  async getUserRoles(userId: number) {
    const user = await this.findOne(userId, {
      relations: ['roles']
    });
    return user && user.roles;
  }

  async getDoctors() {
    return this.createQueryBuilder('user')
      .innerJoinAndSelect('user.roles', 'role', 'role.name = :role', {
        role: 'Doctor'
      })
      .getMany();
  }

  async getPatients() {
    return this.createQueryBuilder('user')
      .innerJoinAndSelect('user.roles', 'role', 'role.name = :role', {
        role: 'Patient'
      })
      .getMany();
  }
}
