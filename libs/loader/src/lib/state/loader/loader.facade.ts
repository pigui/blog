import { Injectable } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as LoaderActions from './loader.actions';
import * as LoaderFeature from './loader.reducer';
import * as LoaderSelectors from './loader.selectors';

@Injectable()
export class LoaderFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */

  isLoading$: Observable<boolean> = this.store.pipe(
    select(LoaderSelectors.getIsLoading)
  );

  constructor(private readonly store: Store) {}

  start(): void {
    this.store.dispatch(LoaderActions.startLoader());
  }

  stop(): void {
    this.store.dispatch(LoaderActions.stopLoader());
  }
}
