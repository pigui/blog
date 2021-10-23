import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LOADER_FEATURE_KEY, State } from './loader.reducer';

// Lookup the 'Loader' feature state managed by NgRx
export const getLoaderState = createFeatureSelector<State>(LOADER_FEATURE_KEY);

export const getIsLoading = createSelector(
  getLoaderState,
  (state) => state.isLoading
);
