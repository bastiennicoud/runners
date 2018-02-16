import {NgModule, ErrorHandler, LOCALE_ID, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core'
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
import { SplashPage } from '../pages/splash/splash'
import { SplashPageModule } from '../pages/splash/splash.module'
import { RunnerPage } from '../pages/runner/runner'
import { DriversPage } from '../pages/drivers/drivers'
import { DriverPage } from '../pages/driver/driver'

import { PipesModule } from '../pipes/pipes.module'
import { GroupRunsPipe } from '../pipes/group-runs.pipe'
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
import { CalendarPageModule } from "../pages/calendar/calendar.module"
import { CacheProvider } from '../providers/cache/cache'
import { RefresherProvider } from '../providers/refresher/refresher'
import {Calendar} from "@ionic-native/calendar";

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
    SettingsPage,
    HomePage,
    DriversPage,
    DriverPage,
  ],
  imports: [
    BrowserModule,
    SplashPageModule,
    HttpClientModule,
    PipesModule,
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
    DriversPage,
    DriverPage,
  ],
  providers: [
    StatusBar,
    Calendar,
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
    RefresherProvider,
  ],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule {
  constructor(private config: Config, private authStorage: AuthStorage) {
    filters.mine.externalData = this.authStorage.user
    filters.hideCompleted.disable()
    filters.hideNotReady.disable()
    filters.mine.disable()
    filters.urgent.disable()
  }
}
