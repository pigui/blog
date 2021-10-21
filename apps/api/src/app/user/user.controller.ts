import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUserByEmailDto } from './dto/find-user-by-email.dto';
import { FindUserByIdDto } from './dto/find-user-by-id.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  find(): Observable<UserEntity[]> {
    return this.userService.find();
  }

  @Get('id/:id')
  findById(@Param() { id }: FindUserByIdDto): Observable<UserEntity> {
    return this.userService.findById(id);
  }

  @Get('email/:email')
  findByEmail(@Param() { email }: FindUserByEmailDto): Observable<UserEntity> {
    return this.userService.findByEmail(email);
  }

  @Post()
  save(@Body() createUserDto: CreateUserDto): Observable<UserEntity> {
    return this.userService.save(createUserDto);
  }
}
