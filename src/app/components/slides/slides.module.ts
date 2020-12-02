import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SlidesPageRoutingModule } from './slides-routing.module';

import { SlidesPage } from './slides.page';
import { AvatarModule } from 'ngx-avatar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SlidesPageRoutingModule,
    AvatarModule

  ],
  declarations: [SlidesPage]
})
export class SlidesPageModule {}
