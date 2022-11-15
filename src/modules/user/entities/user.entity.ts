import { Exclude } from 'class-transformer';
import { BaseAbstractEntity } from 'src/modules/abstract/base.abstract';
import { encryptPassword } from 'src/utils/bcrypt';
import { BeforeInsert, Column, Entity } from 'typeorm';

@Entity({ name: 'user' })
export class User extends BaseAbstractEntity {
  @Column({
    comment: '用户名',
  })
  name: string;

  @Exclude()
  @Column({
    comment: '密码',
  })
  password: string;

  @Column({
    comment: '邮箱',
    nullable: true,
  })
  email?: string;

  @Column({
    comment: '激活状态',
    default: true,
  })
  isActive: boolean;

  @BeforeInsert()
  async encryptPwd() {
    this.password = await encryptPassword(this.password);
  }
}
