import { Action } from '@ngrx/store';

import * as LoaderActions from './loader.actions';
import { LoaderEntity } from './loader.models';
import { State, initialState, reducer } from './loader.reducer';

describe('Loader Reducer', () => {
  const createLoaderEntity = (id: string, name = ''): LoaderEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Loader actions', () => {
    it('loadLoaderSuccess should return the list of known Loader', () => {
      const loader = [
        createLoaderEntity('PRODUCT-AAA'),
        createLoaderEntity('PRODUCT-zzz'),
      ];
      const action = LoaderActions.loadLoaderSuccess({ loader });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
