import { ReflectMetadata } from '@nestjs/common';
import { ACL } from '../enums';

export const AccessControl = (acl: ACL[]) => ReflectMetadata('acl', acl);
