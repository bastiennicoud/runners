import { NgModule, ErrorHandler, LOCALE_ID } from '@angular/core'
import { IonicApp, IonicModule, IonicErrorHandler, Config } from 'ionic-angular'
import { BrowserModule } from '@angular/platform-browser'
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http'

import { CacheModule } from 'ionic-cache'

import { StatusBar } from '@ionic-native/status-bar'
import { SplashScreen } from '@ionic-native/splash-screen'
import { BarcodeScanner } from '@ionic-native/barcode-scanner'

import { getApi } from '../runners.getter'
import { API_ENDPOINT } from '../tokens/api-endpoint'

import { VehicleService } from '../services/vehicle.service'
import { UserService } from '../services/user.service'
import { RunService } from '../services/run.service'
import { RunnerService } from '../services/runner.service'
import { AuthService } from '../services/auth.service'
import { AuthStorage } from '../storages/auth.storage'

import { MyApp } from './app.component'
import { LoginPage } from '../pages/login/login'
import { TabsPage } from '../pages/tabs/tabs'
import { RunsPage } from '../pages/runs/runs'
import { RunPage } from '../pages/run/run'
import { ProfilPage } from '../pages/profil/profil'
import { VehiclesPage } from '../pages/vehicles/vehicles'
import { VehiclePage } from '../pages/vehicle/vehicle'
import { RunnerPage } from '../pages/runner/runner'

import { GroupRunsPipe } from '../pipes/group-runs.pipe'
import { GroupVehicleStatusPipe } from '../pipes/group-vehicle-status.pipe'
import { ApiTokenInterceptor } from '../services/interceptors/ApiTokenInterceptor'
import { AuthFailedInterceptor } from '../services/interceptors/AuthFailedInterceptor'
import { CachingInterceptor } from '../services/interceptors/CachingInterceptor'
import { ModalScaleUpLeaveTransition } from '../pages/transitions/scale-up-leave.transition'
import { ModalScaleUpEnterTransition } from '../pages/transitions/scale-up-enter.transition'

import { filterEngine, filters } from '../utils/filterengine/filterEngine'

//register i81n locale
import { registerLocaleData } from '@angular/common'
import localeFr from '@angular/common/locales/fr'
registerLocaleData(localeFr, 'fr')

import { InternetStatusProvider } from '../providers/internet-status/internet-status'
import { SettingsPage } from '../pages/settings/settings'
import { HomePage } from '../pages/home/home'
import { CacheProvider } from '../providers/cache/cache';
import {CalendarPageModule} from "../pages/calendar/calendar.module";

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
    GroupRunsPipe,
    GroupVehicleStatusPipe,
    SettingsPage,
    HomePage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CalendarPageModule,
    CacheModule.forRoot(),
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
    SettingsPage,
    HomePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    {
      provide: API_ENDPOINT,
      useValue: getApi(),
    },
    {
      provide: LOCALE_ID,
      useValue: 'fr-CH',
    },
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiTokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthFailedInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CachingInterceptor,
      multi: true,
    },
    AuthStorage,
    UserService,
    AuthService,
    VehicleService,
    RunService,
    RunnerService,
    InternetStatusProvider,
    CacheProvider,
  ],
})
export class AppModule {
  constructor(private config: Config, private authStorage: AuthStorage) {
    this.config.setTransition(
      'modal-scale-up-leave',
      ModalScaleUpLeaveTransition
    )
    this.config.setTransition(
      'modal-scale-up-enter',
      ModalScaleUpEnterTransition
    )
    filters.mine.externalData = this.authStorage.user
    filters.hideCompleted.disable()
    filters.hideNotReady.disable()
    filters.mine.disable()
    filters.urgent.disable()
  }
}
