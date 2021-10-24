import { Injectable } from '@angular/core';
import { CreateBlog } from '@blog/home';
import { select, Store, Action } from '@ngrx/store';

import * as HomeActions from './home.actions';
import * as HomeFeature from './home.reducer';
import * as HomeSelectors from './home.selectors';

@Injectable()
export class HomeFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */

  allHome$ = this.store.pipe(select(HomeSelectors.getAllHome));
  selectedHome$ = this.store.pipe(select(HomeSelectors.getSelected));

  constructor(private readonly store: Store) {}

  createBlog(createBlog: CreateBlog): void {
    this.store.dispatch(HomeActions.createBlog({ request: createBlog }));
  }

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(HomeActions.init());
  }
}
