import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as AuthActions from './auth.actions';
import { UserEntity } from './auth.models';

export const AUTH_FEATURE_KEY = 'auth';

export interface State {
  isAuth: boolean;
  user: UserEntity | null;
}

export interface AuthPartialState {
  readonly [AUTH_FEATURE_KEY]: State;
}

export const initialState: State = {
  isAuth: false,
  user: null,
};

const authReducer = createReducer(initialState);

export function reducer(state: State | undefined, action: Action) {
  return authReducer(state, action);
}
