import {
  Injectable,
  Inject,
  UnauthorizedException,
  BadRequestException
} from '@nestjs/common';
import { classToPlain } from 'class-transformer';
import { subDays } from 'date-fns';
import * as _ from 'lodash';

import {
  UserRepository,
  User,
  RoleRepository,
  Appointment,
  AppointmentRepository
} from '../../database';
import { BcryptService, JwtService } from '../../shared';
import { Roles } from '../enums';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepositoryToken')
    private readonly userRepository: UserRepository,
    @Inject('RoleRepositoryToken')
    private readonly roleRepository: RoleRepository,
    @Inject('AppointmentRepositoryToken')
    private readonly appointmentRepository: AppointmentRepository,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService
  ) {}

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['roles']
    });
    if (!user) throw new UnauthorizedException();
    const isValidPassword = await this.bcryptService.compareHash(
      password,
      user.password
    );
    if (!isValidPassword) throw new UnauthorizedException();
    const token = this.jwtService.sign(classToPlain(user));
    return { user, token };
  }

  async preProcessUser(user: User) {
    const exists = await this.userRepository.exists(user);
    if (!exists) delete user.id;
    if (user.password)
      user.password = await this.bcryptService.hash(user.password);
    console.log(user);
  }

  async saveUser(user: User) {
    await this.preProcessUser(user);
    return this.userRepository.save(user);
  }

  async saveDoctor(user: User) {
    await this.preProcessUser(user);
    delete user.roles;
    if (!user.id) {
      const role = await this.roleRepository.findOne({
        where: { name: Roles.Doctor }
      });
      user.roles = [role];
    }
    return this.userRepository.save(user);
  }

  async savePatient(user: User) {
    await this.preProcessUser(user);
    delete user.roles;
    if (!user.id) {
      const role = await this.roleRepository.findOne({
        where: { name: Roles.Patient }
      });
      user.roles = [role];
    }
    return this.userRepository.save(user);
  }

  async addUserAppointments(userId: number, appointments: Appointment[]) {
    _.forEach(
      appointments,
      appointment => (appointment.doctor = { id: userId })
    );
    const userRoles = await this.userRepository.getUserRoles(userId);
    console.log(userRoles);
    if (!!_.find(userRoles, { name: Roles.Doctor })) {
      const appointmentsCount = await this.appointmentRepository.count({
        where: { doctor: { id: userId, createdDate: subDays(new Date(), 1) } }
      });
      if (appointmentsCount >= 5) throw new BadRequestException();
    }
    return this.appointmentRepository.save(appointments);
  }
}
