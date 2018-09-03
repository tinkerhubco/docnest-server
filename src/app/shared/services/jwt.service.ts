import { Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';

@Injectable()
export class JwtService {

  public sign(data: any) {
    if (!data) return;
    return sign(data, 'secret');
  }

  public verify(token: any) {
    try {
      return verify(token, 'secret');
    } catch (error) {
      return null;
    }
  }
}
