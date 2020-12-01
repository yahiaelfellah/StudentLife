import { MyCardComponent } from './../components/my-card/my-card.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';

import { Tab3PageRoutingModule } from './tab3-routing.module'
import { AntdModule } from '../antd.module';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab3Page }]),
    Tab3PageRoutingModule,
    NzIconModule,
    AntdModule,
  ],
  declarations: [Tab3Page, MyCardComponent]
})
export class Tab3PageModule {}
