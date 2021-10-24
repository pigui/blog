import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromHome from './state/home/home.reducer';
import { HomeEffects } from './state/home/home.effects';
import { HomeFacade } from './state/home/home.facade';
import { HttpClientModule } from '@angular/common/http';
import { LoaderModule as LoaderStoreModule } from '@blog/loader';

export const API_URL = new InjectionToken<string>('');

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature(fromHome.HOME_FEATURE_KEY, fromHome.reducer),
    EffectsModule.forFeature([HomeEffects]),
    LoaderStoreModule,
  ],
  providers: [HomeFacade],
})
export class HomeModule {
  static forRoot(apiUrl: string): ModuleWithProviders<any> {
    return {
      ngModule: HomeModule,
      providers: [
        {
          provide: API_URL,
          useValue: apiUrl,
        },
      ],
    };
  }
}
