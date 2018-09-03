import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public street: string;

  @Column()
  public city: string;

  @Column()
  public country: string;

  @Column()
  public zipcode: string;

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
