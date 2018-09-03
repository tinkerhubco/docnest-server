import { EntityRepository, Repository } from 'typeorm';

import { User } from '../entities';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  async exists(user: User) {
    if (!user || !user.id) return false;
    return !!(
        await this.findOne(user.id, {
        select: ['id']
      })
    );
  }

  async getUserRoles(userId: number) {
    const user = await this.findOne(userId, {
      relations: ['roles']
    });
    return user && user.roles;
  }

  async getDoctors() {
    return this.createQueryBuilder('user')
      .innerJoinAndSelect('user.roles', 'role', 'role.name = :role', {role: 'Doctor'})
      .getMany();
  }

  async getPatients() {
    return this.createQueryBuilder('user')
      .innerJoinAndSelect('user.roles', 'role', 'role.name = :role', {role: 'Patient'})
      .getMany();
  }
}
