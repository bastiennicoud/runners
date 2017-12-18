import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
// import { HttpService } from './http.service';
import { Run } from '../models/run';
import {CacheService} from "ionic-cache";
import {AuthService} from "./auth.service";
import {AuthStorage} from "../storages/auth.storage";
export {Run};
/**
 * Allows you to retrieve or modify the status of a run.
 *
 * @export
 * @class RunService
 */
@Injectable()
export class RunService {

  constructor(private httpService: HttpClient, private cacheService : CacheService, private authStorage: AuthStorage) {}
  protected saveRun(run : Run) : void {
    run.runners.forEach(runner => {
      this.cacheService.saveItem(`runners-${runner.id}`, runner)
      if(runner.vehicle)
        this.cacheService.saveItem(`vehicles-${runner.vehicle.id}`, runner.vehicle)
    })
  }
  protected saveRunList(runs: Run[]) : void{
    this.cacheService.saveItem("runs",runs);
    runs.forEach(run => {
      this.cacheService.saveItem(`runs-${run.id}`, run)
      this.saveRun(run)
    })
  }
  protected getListFromCache(key : string){
    const cached$ = Observable.fromPromise(this.cacheService.getItem(key))

    return cached$
      .merge(
        this.httpService.get('endpoint')
          .do(result => this.cacheService.saveItem('key', result))
      )
      .distinctUntilChanged()
  }

  createRunnerForCurrentUser(key:string){
    return this.httpService.post(`/runs/${key}/runners`,{
      user: this.authStorage.user.id
    })
  }

/**
 * List all run
 *
 * @returns {Observable<Run[]>}
 *
 * @memberOf RunService
 */
  all(): Observable<Run[]> {
    return this.httpService
      .get<any[]>('/runs?finished=true')
      .map(array => array.map(data => Run.build(data)))
      .map(runs => runs.map(run => {
        //if(run.missingUsers())
          return run;
      }))
      // .do(runs => this.saveRunList(runs));
  }

  /**
   * Get one run
   *
   * @param {string} id Unique identifier of the run
   * @returns {Observable<Run>}
   *
   * @memberOf RunService
   */
  get(id: string): Observable<Run> {
    //TODO find a way to load the specific ressource, and only if that is unnaccessible use the run list and filter
    // right now, this only takes the list and filters
    return this.all()
      .do(runs => console.log(runs))
      .map(runs => runs.filter(run => run.id == id))
      .do(runs => console.log(runs))
      .map(runs => runs.length ? runs[0] : null);
    /*
    var maybe: Observable<Run> = Observable.empty()

    let normal: Observable<Run> = this.httpService
      .get<any>(`/runs/${id}`)
      .isEmpty()
      .filter(empty => {
        console.log(empty)
        return !empty
      })
      .flatMap(d => {
        return this.all()
          .do(runs => console.log(runs))
          .map(runs => runs.filter(run => run.id == id))
          .do(runs => console.log(runs))
          .map(runs => runs.length ? runs[0] : null)
      })

    return normal.merge(maybe) */

  }

  /**
   * Start the run.
   * All member are ready to execute the run.
   *
   * @param {Run} { id }
   * @returns {Observable<any>}
   *
   * @memberOf RunService
   */
  start({ id }: Run): Observable<any> {
    return this.httpService.post(`/runs/${id}/start`, '');
  }

/**
 * Stop the run.
 * This action close the run (completed)
 *
 * @param {Run} { id }
 * @returns {Observable<any>}
 *
 * @memberOf RunService
 */
  stop({ id }: Run): Observable<any> {
    return this.httpService.post(`/runs/${id}/stop`, '');
  }

}
