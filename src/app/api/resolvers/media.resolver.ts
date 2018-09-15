import { Inject } from '@nestjs/common';
import { Mutation, Query, Resolver } from '@nestjs/graphql';

import { MediaRepository } from '../../database';

@Resolver('Media')
export class MediaResolver {
  constructor(
    @Inject('MediaRepositoryToken')
    private readonly mediaRepository: MediaRepository
  ) {}

  @Query()
  async getMedia(request, args) {
    const { mediaId } = args;
    return this.mediaRepository.findOne(mediaId);
  }

  @Query()
  async getMedias(request, args) {
    return this.mediaRepository.find();
  }

  @Mutation()
  async saveMedia(request, args) {
    const { media } = args;
    return this.mediaRepository.save({ ...media });
  }

  @Mutation()
  async deleteMedia(request, args) {
    const { mediaId } = args;
    return this.mediaRepository.delete(mediaId);
  }
}
