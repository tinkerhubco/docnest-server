import { EntityRepository, Repository } from 'typeorm';

import { Subscription } from '../entities';

@EntityRepository(Subscription)
export class SubscriptionRepository extends Repository<Subscription> {}
