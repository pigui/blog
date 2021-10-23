import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as AuthActions from './auth.actions';
import { Register, UserEntity } from './auth.models';
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

  constructor(private readonly store: Store) {}

  onRegister(register: Register) {
    this.store.dispatch(AuthActions.register({ request: register }));
  }
}
