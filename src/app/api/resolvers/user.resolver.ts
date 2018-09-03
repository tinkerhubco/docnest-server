import { Inject, UseGuards } from '@nestjs/common';
import { Mutation, Query, ResolveProperty, Resolver } from '@nestjs/graphql';
import * as _ from 'lodash';

import { User, UserRepository, RoleRepository, AppointmentRepository } from '../../database';
import { AccessControlGuard } from '../guards';
import { AccessControl } from '../decorators';
import { ACL } from '../enums';
import { UserService } from '../services';

@UseGuards(AccessControlGuard)
@Resolver('User')
export class UserResolver {
  constructor(
    @Inject('UserRepositoryToken')
    private readonly userRepository: UserRepository,
    @Inject('RoleRepositoryToken')
    private readonly roleRepository: RoleRepository,
    @Inject('AppointmentRepositoryToken')
    private readonly appointmentRepository: AppointmentRepository,
    private readonly userService: UserService
  ) {}

  @AccessControl([ACL.Admin])
  @Query()
  async getUser(request, args) {
    const { userId } = args;
    return this.userRepository.findOne(userId);
  }

  @AccessControl([ACL.Admin])
  @Query()
  async getUsers(request, args) {
    return this.userRepository.find();
  }

  @AccessControl([ACL.Admin])
  @Query()
  async getDoctors(request, args) {
    return this.userRepository.getDoctors();
  }

  @AccessControl([ACL.Admin, ACL.Doctor])
  @Query()
  async getPatients(request, args) {
    return this.userRepository.getPatients();
  }

  @AccessControl([ACL.Admin])
  @Mutation()
  async saveUser(request, args) {
    const { user } = args;
    return this.userService.saveUser({...user});
  }

  @AccessControl([ACL.Admin, ACL.Doctor])
  @Mutation()
  async saveDoctor(request, args) {
    const { user } = args;
    return this.userService.saveDoctor({...user});
  }

  @AccessControl([ACL.Admin, ACL.Doctor])
  @Mutation()
  async savePatient(request, args) {
    const { user } = args;
    return this.userService.savePatient({...user});
  }

  @AccessControl([ACL.Admin])
  @Mutation()
  async deleteUser(request, args) {
    const { userId } = args;
    return this.userRepository.delete(userId);
  }

  @Mutation()
  async login(request, args) {
    const { email, password } = args;
    return this.userService.login(email, password);
  }

  @ResolveProperty('roles')
  async getUserRoles(user: User, args) {
    return this.userRepository
      .createQueryBuilder()
      .relation('roles')
      .of(user)
      .loadMany();
  }

  @ResolveProperty('subscription')
  async getUserSubscription(user: User, args) {
    return this.userRepository
      .createQueryBuilder()
      .relation('subscription')
      .of(user)
      .loadOne();
  }

  @ResolveProperty('appointments')
  async getUserAppointments(user: User, args) {
    return this.appointmentRepository.find({
      where: { doctor: { id: user.id } }
    });
  }
}
