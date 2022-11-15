import { BaseAbstractEntity } from 'src/modules/abstract/base.abstract';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'categoty' })
export class Category extends BaseAbstractEntity {
  @Column({
    comment: '名称',
  })
  name: string;
}
