import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import * as LoaderActions from './loader.actions';
import * as LoaderFeature from './loader.reducer';

@Injectable()
export class LoaderEffects {
  constructor(private readonly actions$: Actions) {}
}
