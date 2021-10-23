import { LoaderEntity } from './loader.models';
import {
  loaderAdapter,
  LoaderPartialState,
  initialState,
} from './loader.reducer';
import * as LoaderSelectors from './loader.selectors';

describe('Loader Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getLoaderId = (it: LoaderEntity) => it.id;
  const createLoaderEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as LoaderEntity);

  let state: LoaderPartialState;

  beforeEach(() => {
    state = {
      loader: loaderAdapter.setAll(
        [
          createLoaderEntity('PRODUCT-AAA'),
          createLoaderEntity('PRODUCT-BBB'),
          createLoaderEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Loader Selectors', () => {
    it('getAllLoader() should return the list of Loader', () => {
      const results = LoaderSelectors.getAllLoader(state);
      const selId = getLoaderId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = LoaderSelectors.getSelected(state) as LoaderEntity;
      const selId = getLoaderId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getLoaderLoaded() should return the current "loaded" status', () => {
      const result = LoaderSelectors.getLoaderLoaded(state);

      expect(result).toBe(true);
    });

    it('getLoaderError() should return the current "error" state', () => {
      const result = LoaderSelectors.getLoaderError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
