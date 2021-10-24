import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { AuthGuard } from '../guards/auth.guard';

@NgModule({
  declarations: [],
  imports: [CommonModule, PrivateRoutingModule],
  providers: [AuthGuard],
})
export class PrivateModule {}
