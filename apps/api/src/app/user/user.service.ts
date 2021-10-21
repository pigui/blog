import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository
  ) {}

  findByEmail(email: string): Observable<UserEntity> {
    return from(this.userRepository.findByEmail(email));
  }

  findById(id: string): Observable<UserEntity> {
    return from(this.userRepository.findById(id));
  }

  find(): Observable<UserEntity[]> {
    return from(this.userRepository.find());
  }

  save(createUserDto: CreateUserDto): Observable<UserEntity> {
    return from(this.userRepository.saveUser(createUserDto));
  }
}
