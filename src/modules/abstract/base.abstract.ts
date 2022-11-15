import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseAbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    type: 'timestamp',
    comment: '创建时间',
  })
  createdTime: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    comment: '更新时间',
  })
  updatedTime: Date;
}
