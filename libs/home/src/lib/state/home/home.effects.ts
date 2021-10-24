import { Inject, Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch, optimisticUpdate, pessimisticUpdate } from '@nrwl/angular';
import { API_URL } from '../../home.module';
import { HttpClient } from '@angular/common/http';

import * as HomeActions from './home.actions';
import * as HomeFeature from './home.reducer';
import { map } from 'rxjs';
import { BlogEntity } from './home.models';
import { startLoader, stopLoader } from '@blog/loader';

const START_LOADER = [HomeActions.createBlog, HomeActions.init];

const STOP_LOADER = [
  HomeActions.createBlogSuccess,
  HomeActions.createBlogFailure,
  HomeActions.loadHomeFailure,
  HomeActions.loadHomeSuccess,
];

@Injectable()
export class HomeEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HomeActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          //return HomeActions.loadHomeSuccess({ home: [] });
          return this.http
            .get<BlogEntity[]>(`${this.apiUrl}blog`)
            .pipe(map((payload) => HomeActions.loadHomeSuccess({ payload })));
        },
        onError: (action, error) => {
          console.error('Error', error);
          return HomeActions.loadHomeFailure({ error });
        },
      })
    )
  );

  createBlog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HomeActions.createBlog),
      fetch({
        run: (action) => {
          return this.http
            .post<BlogEntity>(`${this.apiUrl}blog`, action.request)
            .pipe(map((payload) => HomeActions.createBlogSuccess({ payload })));
        },
        onError: () => HomeActions.createBlogFailure(),
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

  constructor(
    private readonly actions$: Actions,
    @Inject(API_URL) private apiUrl: string,
    private http: HttpClient
  ) {}
}
