import { BaseAbstractEntity } from 'src/modules/abstract/base.abstract';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'article' })
export class Article extends BaseAbstractEntity {
  @Column({
    comment: '标题',
  })
  title: string;

  @Column({
    comment: '作者',
  })
  author: string;

  @Column({
    comment: '内容',
  })
  content: string;

  @Column({
    comment: '激活状态',
    default: true,
  })
  isActive: boolean;
}
