import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../unused/home/home.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'homeiot',
        loadChildren: () => import('../homeiot/homeiot.module').then(m => m.HomeiotPageModule)
      },
      {
        path: 'classes',
        loadChildren: () => import('../unused/classes/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'task',
        loadChildren: () => import('../tasks/tab3.module').then(m => m.Tab3PageModule),
      },
      {
        path: "profile",
        loadChildren: () => import('../unused/profile/profile.module').then(m => m.ProfilePageModule),
      },
      {
        path: '',
        redirectTo: 'homeiot',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'homeiot',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }