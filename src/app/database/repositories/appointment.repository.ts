import { EntityRepository, Repository } from 'typeorm';

import { Appointment } from '../entities';

@EntityRepository(Appointment)
export class AppointmentRepository extends Repository<Appointment> {}
