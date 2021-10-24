import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as HomeActions from './home.actions';
import { BlogEntity } from './home.models';

export const HOME_FEATURE_KEY = 'home';

export interface State extends EntityState<BlogEntity> {
  selectedId?: string | number; // which Home record has been selected
  // has the Home list been loaded
  error?: string | null; // last known error (if any)
}

export interface HomePartialState {
  readonly [HOME_FEATURE_KEY]: State;
}

export const homeAdapter: EntityAdapter<BlogEntity> =
  createEntityAdapter<BlogEntity>();

export const initialState: State = homeAdapter.getInitialState({
  // set initial rloaded: false,
});

const homeReducer = createReducer(
  initialState,
  on(HomeActions.init, (state) => ({ ...state, loaded: false, error: null })),
  on(HomeActions.loadHomeSuccess, (state, { payload }) =>
    homeAdapter.setAll(payload, { ...state })
  ),
  on(HomeActions.loadHomeFailure, (state, { error }) => ({ ...state, error })),
  on(HomeActions.createBlogSuccess, (state, { payload }) =>
    homeAdapter.addOne(payload, { ...state })
  )
);

export function reducer(state: State | undefined, action: Action) {
  return homeReducer(state, action);
}
