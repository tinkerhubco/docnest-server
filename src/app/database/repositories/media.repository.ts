import { EntityRepository, Repository } from 'typeorm';

import { Media } from '../entities';

@EntityRepository(Media)
export class MediaRepository extends Repository<Media> {}
