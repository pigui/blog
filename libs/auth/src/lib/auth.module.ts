import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromAuth from './state/auth/auth.reducer';
import { AuthEffects } from './state/auth/auth.effects';
import { AuthFacade } from './state/auth/auth.facade';
import { HttpClientModule } from '@angular/common/http';
import { LoaderModule as LoaderStoreModule } from '@blog/loader';

export const API_URL = new InjectionToken<string>('');

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromAuth.AUTH_FEATURE_KEY, fromAuth.reducer),
    EffectsModule.forFeature([AuthEffects]),
    HttpClientModule,
    LoaderStoreModule,
  ],
  providers: [AuthFacade],
})
export class AuthModule {
  static forRoot(apiUrl: string): ModuleWithProviders<any> {
    return {
      ngModule: AuthModule,
      providers: [
        {
          provide: API_URL,
          useValue: apiUrl,
        },
      ],
    };
  }
}
