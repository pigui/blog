import { Inject, Injectable } from '@angular/core';
import { API_URL } from '@blog/auth';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { HttpClient } from '@angular/common/http';

import * as AuthActions from './auth.actions';
import * as AuthFeature from './auth.reducer';
import { map } from 'rxjs';

import { UserEntity } from './auth.models';

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
                AuthActions.registerSuccess({ payload })
              )
            );
        },
        onError: (action, error) => {
          return AuthActions.registerFailure();
        },
      })
    )
  );
}
