import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity()
export class Media {
  @PrimaryGeneratedColumn() public id: number;

  @Column() public filename: string;

  @Column({ name: 'original_url' })
  public originalUrl: string;

  @Column({ name: 'small_url' })
  public smallUrl: string;

  @Column({ name: 'medium_url' })
  public mediumUrl: string;

  @Column({ name: 'large_url' })
  public largeUrl: string;

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
