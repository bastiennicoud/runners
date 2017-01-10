import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { RequestOptions, XHRBackend } from "@angular/http";
import { HttpService } from "../services/http.service";
import {AuthService} from '../services/auth.service';
import {UserService} from '../services/user.service';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
    {
    provide: HttpService,
    useFactory: (backend: XHRBackend, defaultOptions: RequestOptions) => new HttpService(backend, defaultOptions),
    deps: [XHRBackend, RequestOptions]
  },
  {
    provide: UserService,
    useFactory: (http: HttpService) => new UserService(http),
    deps: [HttpService]
  },
  {
    provide: AuthService,
    useFactory: (userService: UserService) => new AuthService(userService),
    deps: [UserService]
  }


  ]
})
export class AppModule {
}
