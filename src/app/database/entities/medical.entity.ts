import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity()
export class Medical {
  @PrimaryGeneratedColumn() public id?: number;

  @Column() public name: string;

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
