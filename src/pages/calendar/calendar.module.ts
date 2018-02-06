import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CalendarPage } from './calendar';
import {CalendarModule} from "ap-angular2-fullcalendar";

@NgModule({
  declarations: [
    CalendarPage,
  ],
  imports: [
    CalendarModule,
    IonicPageModule.forChild(CalendarPage),
  ],
})
export class CalendarPageModule {}
