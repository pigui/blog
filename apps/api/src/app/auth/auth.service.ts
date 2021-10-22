import { Injectable, UnauthorizedException } from '@nestjs/common';
import { from, map, Observable, switchMap } from 'rxjs';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  validateUser(email: string, password: string): Observable<UserEntity> {
    return this.userService.findByEmail(email).pipe(
      switchMap((user) => {
        if (!user) {
          return;
        }
        return from(bcrypt.compare(password, user.password)).pipe(
          map((comparePassword: boolean) => {
            if (!comparePassword) {
              throw new UnauthorizedException();
            }
            return user;
          })
        );
      })
    );
  }

  login(user: UserEntity): Observable<{
    accessToken: string;
    user: UserEntity;
  }> {
    const payload: { id: string } = { id: user.id };
    return from(this.jwtService.signAsync(payload)).pipe(
      map((accessToken) => {
        return {
          accessToken,
          user,
        };
      })
    );
  }
}
