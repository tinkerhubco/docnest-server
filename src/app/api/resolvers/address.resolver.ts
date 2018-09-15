import { Inject } from '@nestjs/common';
import { Mutation, Query, Resolver } from '@nestjs/graphql';

import { AddressRepository } from '../../database';
@Resolver('Address')
export class AddressResolver {
  constructor(
    @Inject('AppointmentRepositoryToken')
    private readonly addressRepository: AddressRepository
  ) {}

  @Query()
  async getAddress(request, args) {
    const { addressId } = args;
    return this.addressRepository.findOne(addressId);
  }

  @Query()
  async getAddresses(request, args) {
    return this.addressRepository.find();
  }

  @Mutation()
  async saveAddress(request, args) {
    const { address } = args;
    return this.addressRepository.save({ ...address });
  }

  @Mutation()
  async deleteAddress(request, args) {
    const { addressId } = args;
    return this.addressRepository.delete(addressId);
  }
}
