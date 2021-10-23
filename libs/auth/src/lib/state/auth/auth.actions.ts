import { createAction, props } from '@ngrx/store';
import { UserEntity, Register, Login, AccessToken } from './auth.models';

export const register = createAction(
  '[Auth] Register',
  props<{ request: Register }>()
);

export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<{ payload: UserEntity; request: Login }>()
);

export const registerFailure = createAction('[Auth] Register Failure');

export const login = createAction('[Auth] Login', props<{ request: Login }>());

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ payload: AccessToken }>()
);

export const loginFailure = createAction('[Auth] Login Failure');

export const logout = createAction('[Auth] Logout');
