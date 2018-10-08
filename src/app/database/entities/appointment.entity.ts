import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

import { User } from './user.entity';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn() public id?: number;

  @OneToOne(type => User)
  @JoinColumn({ name: 'doctor_id' })
  public doctor: User;

  @OneToOne(type => User)
  @JoinColumn({ name: 'patient_id' })
  public patient: User;

  @OneToOne(type => User)
  @JoinColumn({ name: 'created_by' })
  public createdBy: User;

  @Column('text') public status: string;

  @Column('timestamp') public date: Date;

  @CreateDateColumn({
    name: 'created_date',
    type: 'timestamp'
  })
  public createdDate: Date;

  @UpdateDateColumn({
    name: 'updated_date',
    type: 'timestamp'
  })
  public updatedDate: Date;
}
