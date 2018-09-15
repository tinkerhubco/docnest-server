import { ReflectMetadata } from '@nestjs/common';

export const AccessControl = (acl: string[]) => ReflectMetadata('acl', acl);
