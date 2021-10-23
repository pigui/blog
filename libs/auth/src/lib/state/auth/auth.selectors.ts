import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AUTH_FEATURE_KEY, State } from './auth.reducer';

// Lookup the 'Auth' feature state managed by NgRx
export const getAuthState = createFeatureSelector<State>(AUTH_FEATURE_KEY);

export const getIsAuth = createSelector(getAuthState, (state) => state.isAuth);

export const getUser = createSelector(getAuthState, (state) => state.user);
