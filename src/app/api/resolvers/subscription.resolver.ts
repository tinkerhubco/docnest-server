import { Inject } from '@nestjs/common';
import { Mutation, Query, Resolver } from '@nestjs/graphql';

import { SubscriptionRepository } from '../../database';

@Resolver('Subscription')
export class SubscriptionResolver {
  constructor(
    @Inject('SubscriptionRepositoryToken')
    private readonly subscriptionRepository: SubscriptionRepository
  ) {}

  @Query()
  async getSubscription(request, args) {
    const { subscriptionId } = args;
    return this.subscriptionRepository.findOne(subscriptionId);
  }

  @Query()
  async getSubscriptions(request, args) {
    return this.subscriptionRepository.find();
  }

  @Mutation()
  async saveSubscription(request, args) {
    const { subscription } = args;
    return this.subscriptionRepository.save({...subscription});
  }

  @Mutation()
  async deleteSubscription(request, args) {
    const { subscriptionId } = args;
    return this.subscriptionRepository.delete(subscriptionId);
  }
}
