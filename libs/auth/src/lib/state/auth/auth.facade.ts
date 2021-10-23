import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as AuthActions from './auth.actions';
import { Login, Register, UserEntity } from './auth.models';
import * as AuthFeature from './auth.reducer';
import * as AuthSelectors from './auth.selectors';

@Injectable()
export class AuthFacade {
  user$: Observable<UserEntity | null> = this.store.pipe(
    select(AuthSelectors.getUser)
  );

  isAuth$: Observable<boolean> = this.store.pipe(
    select(AuthSelectors.getIsAuth)
  );

  accessToken$: Observable<string | null> = this.store.pipe(
    select(AuthSelectors.getAccessToken)
  );

  constructor(private readonly store: Store) {}

  onRegister(register: Register): void {
    this.store.dispatch(AuthActions.register({ request: register }));
  }

  onLogin(login: Login): void {
    this.store.dispatch(AuthActions.login({ request: login }));
  }

  onLogout(): void {
    this.store.dispatch(AuthActions.logout());
  }
}
