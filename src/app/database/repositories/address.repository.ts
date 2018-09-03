import { EntityRepository, Repository } from 'typeorm';

import { Address } from '../entities';

@EntityRepository(Address)
export class AddressRepository extends Repository<Address> {}
