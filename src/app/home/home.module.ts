import { TimePipe } from "../helper/pipes/time.pipe";
import { AntdModule } from "../antd.module";
import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HomePage } from "./home.page";
import { ExploreContainerComponentModule } from "../explore-container/explore-container.module";

import { Tab1PageRoutingModule } from "./home-routing.module";
import { NgCircleProgressModule } from "ng-circle-progress";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    AntdModule,
    NgCircleProgressModule.forRoot({
      startFromZero: false,
    }),
  ],
  declarations: [HomePage, TimePipe],
})
export class Tab1PageModule {}
