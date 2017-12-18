import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
// import { HttpService } from './http.service';
import { Run } from '../models/run';
import {CacheService} from "ionic-cache";
export {Run};
/**
 * Allows you to retrieve or modify the status of a run.
 *
 * @export
 * @class RunService
 */
@Injectable()
export class RunService {

  constructor(private httpService: HttpClient, private cacheService : CacheService) {}
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
/**
 * List all run
 *
 * @returns {Observable<Run[]>}
 *
 * @memberOf RunService
 */
  all(): Observable<Run[]> {
    return this.httpService
      .get<any[]>('/runs?status=needs_filling,empty,error')
      .map(array => array.map(data => Run.build(data)))
      .map(runs => runs.map(run => {
        if(run.missingUsers())
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

    var maybe: Observable<Run> = Observable.empty()

    let normal: Observable<Run> = this.httpService
      .get<any>(`/runs/${id}`)
      /*.map(data => Run.build(data))
      .flatMap((run:Run) => {
        if(run == null)
          this.all()
            .do(runs => console.log(runs))
            .map(runs => runs.filter(run => run.id == id))
            .do(runs => console.log(runs))
            .map(runs => runs.length ? runs[0] : null)
            .do(d => console.log(d))
        else
          return run
            // .subscribe(r => run = r, (err) => console.log(err), () => console.log("finished"))
      })*/

      /*.catch((err) => {

        console.log(err)
        if (err instanceof HttpErrorResponse && !this.cacheService.isOnline()) {
          console.log("AHBAMNSDASNDBMASD")
          console.log(maybe)
          maybe.publish
          this.all()
            .do(runs => console.log(runs))
            .map(runs => runs.filter(run => run.id == id))
            .do(runs => console.log(runs))
            .map(runs => runs.length ? runs[0] : null)
            .do(d => console.log(d))
            .subscribe(run => maybe = Observable.of(run), (err) => console.log(err), () => console.log("finished"))
          console.log(maybe)
        }

        else
          Observable.throw(err)
      })*/

    return normal.merge(maybe)
    /*return Observable.concat(
      this.httpService
        .get<any>(`/runs/${id}`)
        .map(data => Run.build(data)),
      this.all()
          .do(runs => console.log(runs))
          .map(runs => runs.filter(run => run.id == id))
          .do(runs => console.log(runs))
          .map(runs => runs.length ? runs[0] : null)
    )*/
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
