import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {CacheService} from "ionic-cache";
import {Observable, Subscribable} from "rxjs/Observable";
import {Storage} from "@ionic/storage";
import {Observer} from "rxjs/Observer";

/*
  Generated class for the CacheProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CacheProvider extends CacheService {
  private _lastRefresh: Date;
  private refreshed : Observable<Date>;
  private KEY = "last-refresh";
  private _observer: Observer<Date>;

  constructor(_storage: Storage) {
    super(_storage);
    this.refreshed = new Observable<Date>(
      observer => this._observer = observer).share();
  }

  ready(): Promise<any>{
    return Promise.all([
      super.ready,
      this.getItem(this.KEY).then((d) => this.setLastRefresh(d)).catch(err => this.setLastRefresh(null))
    ]);
  }
  // don't call any of these until this.ready resolves
  lastRefresh(): Date{
    return this._lastRefresh;
  }
  getRefreshChange(): Observable<Date>{
    return this.refreshed;
  }
  private setLastRefresh(d? : Date){
    this._lastRefresh = d
    super.saveItem(this.KEY,d);
    if (this._observer) {
      this._observer.next(d);
    }
  }
  saveItem(key: string, data: any, groupKey?: string, ttl?: number){
    const date = new Date();
    return super.saveItem(key,data,groupKey,ttl)
      .then(()=>this.setLastRefresh(date))
  }
}
