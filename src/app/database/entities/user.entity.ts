import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn
} from 'typeorm';

import { Role } from './role.entity';
import { Media } from './media.entity';
import { Address } from './address.entity';
import { Subscription } from './subscription.entity';
import { Appointment } from './appointment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn() public id?: number;

  @Column() public email?: string;

  @Column() public password?: string;

  @Column({
    name: 'first_name'
  })
  public firstName?: string;

  @Column({
    name: 'middle_name'
  })
  public middleName?: string;

  @Column({
    name: 'last_name'
  })
  public lastName?: string;

  @CreateDateColumn({
    name: 'created_date',
    type: 'timestamp'
  })
  public createdDate?: Date;

  @UpdateDateColumn({
    name: 'updated_date',
    type: 'timestamp'
  })
  public updatedDate?: Date;

  @OneToOne(type => Media)
  @JoinColumn({ name: 'profile_media_id' })
  public profileMedia?: Media;

  @OneToOne(type => Subscription)
  @JoinColumn({ name: 'subscription_id' })
  public subscription?: Subscription;

  @ManyToMany(type => Role)
  @JoinTable({
    name: 'user_role',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'role_id' }
  })
  public roles?: Role[];

  @ManyToMany(type => Address)
  @JoinTable({
    name: 'user_address',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'address_id' }
  })
  public addresses?: Address[];
}
