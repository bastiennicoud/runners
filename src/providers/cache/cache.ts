import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {CacheService} from "ionic-cache";
import {Observable, Subscribable} from "rxjs/Observable";

/*
  Generated class for the CacheProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CacheProvider {
  ready: Promise<any>;
  private _lastRefresh: Date;
  private KEY = "last-refresh";

  private refreshed : Observable<Date>;
  constructor(
    private _cache: CacheService
  ) {
    this.refreshed = Observable.empty<Date>().share();
    this.ready = Promise.all([
      this._cache.getItem(this.KEY).then((d) => this._lastRefresh = d)
      // &c &c for other similar stuff
    ]);
  }

  // don't call any of these until this.ready resolves
  lastRefresh(): Date{
    return this._lastRefresh;
  }
  getRefreshChange(){
    return this.refreshed;
  }
  setLastRefresh(d : Date){
    this._lastRefresh = d
    this._cache.saveItem(this.KEY,d);
    this.refreshed.onNext(d)
  }

}
