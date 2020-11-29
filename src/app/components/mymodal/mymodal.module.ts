import { NzButtonModule } from 'ng-zorro-antd/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MymodalPageRoutingModule } from './mymodal-routing.module';

import { MymodalPage } from './mymodal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MymodalPageRoutingModule,
    ReactiveFormsModule,
    NzButtonModule,

  ],
  declarations: [MymodalPage]
})
export class MymodalPageModule {}
