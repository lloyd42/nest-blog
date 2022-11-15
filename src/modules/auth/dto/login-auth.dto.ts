import { IsNotEmpty } from 'class-validator';

export class LoginAuthDto {
  @IsNotEmpty({ message: '用户名称不能为空' })
  readonly name: string;

  @IsNotEmpty({ message: '用户密码不能为空' })
  readonly password: string;
}
