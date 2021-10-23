import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromLoader from './state/loader/loader.reducer';
import { LoaderEffects } from './state/loader/loader.effects';
import { LoaderFacade } from './state/loader/loader.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromLoader.LOADER_FEATURE_KEY, fromLoader.reducer),
    EffectsModule.forFeature([LoaderEffects]),
  ],
  providers: [LoaderFacade],
})
export class LoaderModule {}
