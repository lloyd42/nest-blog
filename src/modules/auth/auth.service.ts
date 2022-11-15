import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from 'src/utils/bcrypt';
import { RetJson } from 'src/interfaces/http-response.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(name: string, password: string): Promise<any> {
    const user = await this.userService.findOneByUser(name);
    if (!user) {
      return RetJson.fail('用户不存在');
    }
    if (user && comparePassword(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return RetJson.fail('密码错误');
  }

  async login(user: any) {
    const payload = { username: user.name, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
