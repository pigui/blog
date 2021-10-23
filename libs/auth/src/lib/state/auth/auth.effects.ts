import { Inject, Injectable } from '@angular/core';
import { API_URL } from '@blog/auth';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { HttpClient } from '@angular/common/http';

import * as AuthActions from './auth.actions';
import * as AuthFeature from './auth.reducer';
import { map, switchMap } from 'rxjs';

import { AccessToken, UserEntity } from './auth.models';
import { startLoader, stopLoader } from '@blog/loader';

const START_LOADER = [AuthActions.register, AuthActions.login];

const STOP_LOADER = [
  AuthActions.registerFailure,
  AuthActions.registerSuccess,
  AuthActions.loginFailure,
  AuthActions.loginSuccess,
];

@Injectable()
export class AuthEffects {
  constructor(
    private readonly actions$: Actions,
    @Inject(API_URL) private apiUrl: string,
    private http: HttpClient
  ) {}
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      fetch({
        run: (action) => {
          return this.http
            .post<UserEntity>(`${this.apiUrl}user`, action.request)
            .pipe(
              map((payload: UserEntity) =>
                AuthActions.registerSuccess({
                  payload,
                  request: action.request,
                })
              )
            );
        },
        onError: (action, error) => {
          return AuthActions.registerFailure();
        },
      })
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login, AuthActions.registerSuccess),
      fetch({
        run: (action) => {
          return this.http
            .post<AccessToken>(`${this.apiUrl}auth`, action.request)
            .pipe(
              map((payload: AccessToken) =>
                AuthActions.loginSuccess({ payload })
              )
            );
        },
        onError: (action, error) => {
          return AuthActions.loginFailure();
        },
      })
    )
  );

  startLoader$ = createEffect(() =>
    this.actions$.pipe(
      ofType(...START_LOADER),
      map(() => startLoader())
    )
  );

  stopLoader$ = createEffect(() =>
    this.actions$.pipe(
      ofType(...STOP_LOADER),
      map(() => stopLoader())
    )
  );
}
