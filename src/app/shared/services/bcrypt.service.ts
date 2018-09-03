import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';

@Injectable()
export class BcryptService {

  public hash(plainText: string): Promise<string> {
    return hash(plainText, 10);
  }

  public compareHash(plainText: string, hashString: string): Promise<boolean> {
    return compare(plainText, hashString);
  }
}
