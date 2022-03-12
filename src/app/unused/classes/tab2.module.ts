import { AntdModule } from '../../antd.module';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { MyCardComponent } from '../../components/my-card/my-card.component';
import { RbLetterAvatarModule } from 'rb-letter-avatar'; // <-- import the module
import { AvatarModule } from 'ngx-avatar';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab2PageRoutingModule,
    AntdModule,
    RbLetterAvatarModule,
    AvatarModule

  ],
  declarations: [Tab2Page, MyCardComponent]
})
export class Tab2PageModule { }
