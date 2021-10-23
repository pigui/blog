import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';

import * as LoaderActions from './loader.actions';
import { LoaderEffects } from './loader.effects';
import { LoaderFacade } from './loader.facade';
import { LoaderEntity } from './loader.models';
import {
  LOADER_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './loader.reducer';
import * as LoaderSelectors from './loader.selectors';

interface TestSchema {
  loader: State;
}

describe('LoaderFacade', () => {
  let facade: LoaderFacade;
  let store: Store<TestSchema>;
  const createLoaderEntity = (id: string, name = ''): LoaderEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(LOADER_FEATURE_KEY, reducer),
          EffectsModule.forFeature([LoaderEffects]),
        ],
        providers: [LoaderFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(LoaderFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allLoader$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allLoader$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadLoaderSuccess` to manually update list
     */
    it('allLoader$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allLoader$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        LoaderActions.loadLoaderSuccess({
          loader: [createLoaderEntity('AAA'), createLoaderEntity('BBB')],
        })
      );

      list = await readFirst(facade.allLoader$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
