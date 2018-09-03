import { Inject, Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

@Injectable()
export class DatabaseService {
  constructor(
    @Inject('DbConnectionToken') private readonly connection: Connection
  ) {}

  public async connect(): Promise<void> {
    if (!this.connection.isConnected)
      await this.connection.connect();
  }

  public async disconnect() {
    if (this.connection.isConnected)
      await this.connection.close();
  }

  public async reset() {
    await this.connection.dropDatabase();
    await this.connection.runMigrations();
  }
}
