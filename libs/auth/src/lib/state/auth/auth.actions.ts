import { createAction, props } from '@ngrx/store';
import { UserEntity, Register } from './auth.models';

export const register = createAction(
  '[Auth] Register',
  props<{ request: Register }>()
);

export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<{ payload: UserEntity }>()
);

export const registerFailure = createAction('[Auth] Register Failure');
