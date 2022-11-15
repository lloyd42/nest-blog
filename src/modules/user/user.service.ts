import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RetJson } from 'src/interfaces/http-response.interface';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    const ret = await this.userRepository.save(user);
    if (ret) {
      return RetJson.success('添加用户成功');
    }
    return RetJson.fail('添加用户失败');
  }

  async findAll() {
    const users = await this.userRepository.find();
    if (users) {
      return RetJson.success('查询成功', users);
    }
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (user) {
      return RetJson.success('查询成功', user);
    }
    return RetJson.success('用户不存在');
  }

  findOneByUser(name: string) {
    return this.userRepository.findOneBy({ name });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    const ret = this.userRepository.delete(id);
    if (ret) {
      return RetJson.success('删除用户成功');
    }
    return RetJson.fail('删除用户失败');
  }
}
