import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginView } from './views/login/login.view';
import { RegisterView } from './views/register/register.view';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'register',
    component: RegisterView,
  },
  {
    path: 'login',
    component: LoginView,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
