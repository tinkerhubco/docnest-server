import { Inject } from '@nestjs/common';
import { Mutation, Query, Resolver } from '@nestjs/graphql';

import { RoleRepository } from '../../database';

@Resolver('Role')
export class RoleResolver {
  constructor(
    @Inject('RoleRepositoryToken')
    private readonly roleRepository: RoleRepository
  ) {}

  @Query()
  async getRole(request, args) {
    const { roleId } = args;
    return this.roleRepository.findOne(roleId);
  }

  @Query()
  async getRoles(request, args) {
    return this.roleRepository.find();
  }

  @Mutation()
  async saveRole(request, args) {
    const { role } = args;
    return this.roleRepository.save({ ...role });
  }

  @Mutation()
  async deleteRole(request, args) {
    const { roleId } = args;
    return this.roleRepository.delete(roleId);
  }
}
