import { HttpClient } from '@angular/common/http'
import { Injectable, Injector } from '@angular/core'
import { RunService } from '../../services/run.service'
import { UserService } from '../../services/user.service'
import { VehicleService } from '../../services/vehicle.service'
import { Observable } from 'rxjs/Observable'
import { CacheProvider } from '../cache/cache'

/*
  Generated class for the RefresherProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RefresherProvider {
  private services = {
    runs: RunService,
    users: UserService,
    vehicles: VehicleService,
  }

  private CACHE_KEY = 'APP/FIRST_LAUNCH'

  constructor(
    public http: HttpClient,
    private injector: Injector,
    private cache: CacheProvider
  ) { }

  hisFirstTime(): Promise<any> {
    return this.cache.getItem(this.CACHE_KEY)
  }

  setFirstUsage() {
    this.cache.saveItem(this.CACHE_KEY, true)
  }
  refreshData(services: any[] = null) {
    if (services === null) services = Object.keys(this.services)

    let caller = Observable.empty()

    Object.keys(this.services)
      .filter(keyService => services.indexOf(keyService) !== -1)
      .map(key => this.injector.get(this.services[key]))
      .filter(service => service.all !== undefined || service.refresh !== undefined)
      .map(service => {
        if(service.refresh !== undefined)
          caller = caller.merge(service.refresh())
        else
          caller = caller.merge(service.all())

      })

    return caller
  }
}
