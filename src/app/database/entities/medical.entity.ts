import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToMany
} from 'typeorm';
import { Diagnotic } from './diagnostic.entity';

@Entity()
export class Medical {
  @PrimaryGeneratedColumn() public id?: number;

  @Column() public conditions: string;

  @Column() public medications: string;

  @Column() public treatments: string;

  @OneToMany(type => Diagnotic, diagnostic => diagnostic.medical)
  @JoinColumn({ name: 'diagnostic_id' })
  public diagnostics: Diagnotic[];

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
