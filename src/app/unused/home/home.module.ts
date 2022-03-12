import { TimePipe } from "../../helper/pipes/time.pipe";
import { AntdModule } from "../../antd.module";
import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HomePage } from "./home.page";

import { HomePageRoutingModule } from "./home-routing.module";
import { NgCircleProgressModule } from "ng-circle-progress";
import { AvatarModule } from 'ngx-avatar';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HomePageRoutingModule,
    AntdModule,
    NgCircleProgressModule.forRoot({
      startFromZero: false,
    }),
    AvatarModule

  ],
  declarations: [HomePage, TimePipe],
})
export class Tab1PageModule { }
