import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from './http.service';
import { Run } from '../models/run';

export { Run };

/**
 * Allows you to retrieve or modify the status of a run.
 * 
 * @export
 * @class RunService
 */
@Injectable()
export class RunService {

  constructor(private httpService: HttpService) {}

/**
 * List all run
 * 
 * @returns {Observable<Run[]>}
 * 
 * @memberOf RunService
 */
  all(): Observable<Run[]> {
    return this.httpService
      .get('/runs')
      .map(data => data.json())
      .map(array => array.map(data => Run.build(data)));
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
    return this.httpService
      .get(`/runs/${id}`)
      .map(data => data.json())
      .map(data => Run.build(data));
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
