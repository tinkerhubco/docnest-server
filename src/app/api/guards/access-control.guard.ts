import * as _ from 'lodash';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { User } from '../../database';
import { ACL } from '../enums';

@Injectable()
export class AccessControlGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  public canActivate(context: ExecutionContext): boolean {
    const acl = this.reflector.get<string[]>('acl', context.getHandler());
    if (!acl) return true;
    const request = context.switchToHttp().getRequest();
    return _.some(acl, ac => this.checkIfAllowed(ac, request));
  }

  public checkIfAllowed(ac: string, request: any) {
    const user: User = request.user;
    switch (ac) {
      case ACL.Everyone:
        return true;
      case ACL.Authenticated:
        return !!user;
      case ACL.Owner:
        return user && request.params.id === user.id;
      case ACL.Admin:
        return user && _.find(user.roles, { name: ACL.Admin });
      case ACL.Doctor:
        return user && _.find(user.roles, { name: ACL.Doctor });
      case ACL.Patient:
        return user && _.find(user.roles, { name: ACL.Patient });
      default:
        return false;
    }
  }
}
