import { ConflictException, NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserEntity } from '../entities/user.entity';
import * as bcrypt from 'bcryptjs';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async findByEmail(email: string): Promise<UserEntity> {
    try {
      const user = await this.findOneOrFail({ email });
      return user;
    } catch (e) {
      throw new NotFoundException();
    }
  }

  async findById(id: string): Promise<UserEntity> {
    try {
      const user = await this.findOneOrFail({ id });
      return user;
    } catch (e) {
      throw new NotFoundException();
    }
  }

  async saveUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    try {
      const user = this.create({
        ...createUserDto,
        password: await bcrypt.hash(createUserDto.password, 10),
      });

      return user;
    } catch (e) {
      throw new ConflictException();
    }
  }
}
