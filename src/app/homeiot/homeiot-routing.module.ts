import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeiotPage } from './homeiot.page';

const routes: Routes = [
  {
    path: '',
    component: HomeiotPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeiotPageRoutingModule {}
