import { Inject, BadRequestException, UseGuards } from '@nestjs/common';
import { Mutation, Query, ResolveProperty, Resolver } from '@nestjs/graphql';
import { subDays } from 'date-fns';
import * as _ from 'lodash';

import {
  Appointment,
  AppointmentRepository,
  UserRepository,
  User
} from '../../database';
import { Roles, ACL } from '../enums';
import { AccessControl } from '../decorators';
import { AccessControlGuard } from '../guards';

@UseGuards(AccessControlGuard)
@Resolver('Appointment')
export class AppointmentResolver {
  constructor(
    @Inject('AppointmentRepositoryToken')
    private readonly appointmentRepository: AppointmentRepository,
    @Inject('UserRepositoryToken')
    private readonly userRepository: UserRepository
  ) {}

  @Query()
  async getAppointment(request, args) {
    const { appointmentId } = args;
    return this.appointmentRepository.findOne(appointmentId);
  }

  @Query()
  async getAppointments(request, args) {
    return this.appointmentRepository.find();
  }

  @AccessControl([ACL.Admin, ACL.Doctor])
  @Mutation()
  async saveAppointment(request, args) {
    const currentUser: User = request.user;
    const { appointment } = args;
    if (!!_.find(currentUser.roles, { name: Roles.Doctor })) {
      appointment.doctor = { id: currentUser.id };
      const appointmentsCount = await this.appointmentRepository.count({
        where: {
          doctor: { id: currentUser.id, createdDate: subDays(new Date(), 1) }
        }
      });
      if (appointmentsCount >= 5) throw new BadRequestException();
    }
    return this.appointmentRepository.save({ ...appointment });
  }

  @Mutation()
  async deleteAppointment(request, args) {
    const { appointmentId } = args;
    return this.appointmentRepository.delete(appointmentId);
  }

  @ResolveProperty('patient')
  async getAppointmentPatient(appointment: Appointment, args) {
    return this.appointmentRepository
      .createQueryBuilder()
      .relation('patient')
      .of(appointment)
      .loadOne();
  }

  @ResolveProperty('doctor')
  async getAppointmentDoctor(appointment: Appointment, args) {
    return this.appointmentRepository
      .createQueryBuilder()
      .relation('doctor')
      .of(appointment)
      .loadOne();
  }
}
