import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as LoaderActions from './loader.actions';

export const LOADER_FEATURE_KEY = 'loader';

export interface State {
  isLoading: boolean;
}

export interface LoaderPartialState {
  readonly [LOADER_FEATURE_KEY]: State;
}

export const initialState: State = {
  isLoading: false,
};

const loaderReducer = createReducer(
  initialState,
  on(LoaderActions.startLoader, (state) => {
    return { ...state, isLoading: true };
  }),
  on(LoaderActions.stopLoader, (state) => {
    return { ...state, isLoading: false };
  })
);

export function reducer(state: State | undefined, action: Action) {
  return loaderReducer(state, action);
}
