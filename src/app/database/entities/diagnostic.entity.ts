import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne
} from 'typeorm';
import { Medical } from './medical.entity';

@Entity()
export class Diagnotic {
  @PrimaryGeneratedColumn() public id: number;

  @Column() public diagnostic: string;

  @Column('timestamp') public date: Date;

  @ManyToOne(type => Medical, medical => medical.diagnostics)
  @JoinColumn({ name: 'medical_id' })
  public medical: Medical;

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
