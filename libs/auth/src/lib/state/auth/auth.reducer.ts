import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as AuthActions from './auth.actions';
import { UserEntity } from './auth.models';

export const AUTH_FEATURE_KEY = 'auth';

export interface State {
  isAuth: boolean;
  user: UserEntity | null;
  accessToken: string | null;
}

export interface AuthPartialState {
  readonly [AUTH_FEATURE_KEY]: State;
}

export const initialState: State = {
  isAuth: false,
  user: null,
  accessToken: null,
};

const authReducer = createReducer(
  initialState,
  on(AuthActions.login, () => {
    return initialState;
  }),
  on(AuthActions.loginSuccess, (state, action) => {
    return {
      ...state,
      user: action.payload.user,
      accessToken: action.payload.accessToken,
      isAuth: true,
    };
  }),
  on(AuthActions.loginFailure, () => {
    return initialState;
  }),
  on(AuthActions.logout, () => {
    return initialState;
  })
);

export function reducer(state: State | undefined, action: Action) {
  return authReducer(state, action);
}
