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
        loadChildren: () => import('../home/home.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'classes',
        loadChildren: () => import('../classes/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'task',
        loadChildren: () => import('../tasks/tab3.module').then(m => m.Tab3PageModule),
      },
      {
        path:"profile",
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}