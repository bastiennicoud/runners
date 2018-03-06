import { HttpClient } from '@angular/common/http'
import {Injectable, Injector, NgZone} from '@angular/core'
import { RunService } from '../../services/run.service'
import { UserService } from '../../services/user.service'
import { VehicleService } from '../../services/vehicle.service'
import { Observable } from 'rxjs/Observable'
import { CacheProvider } from '../cache/cache'
import {Subscription} from "rxjs/Subscription";
import {Observer} from "rxjs/Observer";
import {Subject} from "rxjs/Subject";

/*
  Generated class for the RefresherProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RefresherProvider {

  public polling : Observable<any>;
  private services = {
    runs: RunService,
    users: UserService,
    vehicles: VehicleService,
  }

  private CACHE_KEY = 'APP/FIRST_LAUNCH'

  constructor(
    public http: HttpClient,
    private injector: Injector,
    private cache: CacheProvider, private zone: NgZone
  ) {
    console.log('Hello RefresherProvider Provider')
    this.polling = this.execute(this.refreshData, 5000);
  }
  private execute<T>(operation: () => Observable<T>, frequency: number = 1000): Observable<T> {
    const subject = new Subject();
    const source = Observable.create((observer: Observer<T>) => {
      let sub: Subscription;
      this.zone.runOutsideAngular(() => {
        const zone = this.zone;
        sub = Observable.interval(frequency)
          .mergeMap(operation)
          .subscribe({
            next(result) {
              zone.run(() => {
                observer.next(result);
              });
            },
            error(err) {
              zone.run(() => {
                observer.error(err);
              });
            }
          });
      });

      return () => {
        if (sub) {
          sub.unsubscribe();
        }
      };
    });


    return source.multicast(subject)
      .refCount();
  }
  hisFirstTime(): Promise<any> {
    return this.cache.getItem(this.CACHE_KEY)
  }

  setFirstUsage() {
    this.cache.saveItem(this.CACHE_KEY, true)
  }
  refreshData(services: any[] = null) {
    console.debug("refreshing data")
    if (services === null) services = Object.keys(this.services)
    let caller = Observable.empty()

    Object.keys(this.services)
      .filter(keyService => services.indexOf(keyService) !== -1)
      .map(key => this.injector.get(this.services[key]))
      .filter(service => service.all !== undefined)
      .map(service => (caller = caller.merge(service.all())))

    return caller
  }
}
