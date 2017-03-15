import { NgModule, ErrorHandler, LOCALE_ID } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { HttpService } from '../services/http.service';
import { VehicleService } from '../services/vehicle.service';
import { UserService } from '../services/user.service';
import { RunService } from '../services/run.service';
import { RunnerService } from '../services/runner.service';
import { AuthService } from '../services/auth.service';
import { AuthStorage } from '../storages/auth.storage';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { RunsPage } from '../pages/runs/runs';
import { RunPage } from '../pages/run/run';
import { ProfilPage } from '../pages/profil/profil';
import { VehiclesPage } from '../pages/vehicles/vehicles';
import { VehiclePage } from '../pages/vehicle/vehicle';
import { RunnerPage } from '../pages/runner/runner';

import { FilterRunsPipe } from '../pipes/filter-runs.pipe';
import { GroupRunsPipe } from '../pipes/group-runs.pipe';
import { GroupVehicleStatusPipe } from '../pipes/group-vehicle-status.pipe';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    TabsPage,
    RunsPage,
    RunPage,
    VehiclesPage,
    VehiclePage,
    RunnerPage,
    ProfilPage,
    FilterRunsPipe,
    GroupRunsPipe,
    GroupVehicleStatusPipe,
  ],
  imports: [
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    TabsPage,
    RunsPage,
    RunPage,
    VehiclesPage,
    VehiclePage,
    RunnerPage,
    ProfilPage,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'fr-CH',
    },
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler,
    },
    AuthStorage,
    HttpService,
    UserService,
    AuthService,
    VehicleService,
    RunService,
    RunnerService,
  ],
})
export class AppModule {}
