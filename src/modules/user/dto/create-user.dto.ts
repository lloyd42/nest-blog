import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: '用户名称不能为空' })
  readonly name: string;

  @IsNotEmpty({ message: '用户密码不能为空' })
  @Length(6, 20, { message: '密码长度范围6-20' })
  readonly password: string;

  @IsEmail({ message: '电子邮箱格式错误' })
  readonly email?: string;

  @IsNotEmpty({ message: '激活状态不能为空' })
  readonly isActive: boolean;
}
