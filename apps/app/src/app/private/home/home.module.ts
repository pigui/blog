import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeView } from './views/home/home.view';

import { HomeModule as HomeStoreModule } from '@blog/home';
import { ReactiveFormsModule } from '@angular/forms';
import { ValdemortModule } from 'ngx-valdemort';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { environment } from '../../../environments/environment';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from '../../interceptors/auth.service';

@NgModule({
  declarations: [HomeView],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthService,
      multi: true,
    },
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ValdemortModule,
    HomeRoutingModule,
    HomeStoreModule.forRoot(environment.apiUrl),
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
  ],
})
export class HomeModule {}
