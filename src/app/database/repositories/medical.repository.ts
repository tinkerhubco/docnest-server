import { EntityRepository, Repository } from 'typeorm';

import { Medical } from '../entities';

@EntityRepository(Medical)
export class MedicalRepository extends Repository<Medical> {}
