import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeiotPageRoutingModule } from './homeiot-routing.module';

import { HomeiotPage } from './homeiot.page';
import { MyCardComponent } from '../components/my-card/my-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeiotPageRoutingModule
  ],
  declarations: [HomeiotPage, MyCardComponent]
})
export class HomeiotPageModule { }
