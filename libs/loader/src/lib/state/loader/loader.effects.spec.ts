import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { Observable } from 'rxjs';

import * as LoaderActions from './loader.actions';
import { LoaderEffects } from './loader.effects';

describe('LoaderEffects', () => {
  let actions: Observable<Action>;
  let effects: LoaderEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        LoaderEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(LoaderEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: LoaderActions.init() });

      const expected = hot('-a-|', {
        a: LoaderActions.loadLoaderSuccess({ loader: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
