import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from './http.service';
import { Run } from '../models/run';

export { Run };

@Injectable()
export class RunService {

  constructor(private httpService: HttpService) {}

  all(): Observable<Run[]> {
    return this.httpService
      .get('/runs')
      .map(data => data.json())
      .map(array => array.map(data => Run.build(data)));
  }

  get(id: string): Observable<Run> {
    return this.httpService
      .get(`/runs/${id}`)
      .map(data => data.json())
      .map(data => Run.build(data));
  }

  start({ id }: Run): Observable<any> {
    return this.httpService.post(`/runs/${id}/start`, '');
  }

  stop({ id }: Run): Observable<any> {
    return this.httpService.post(`/runs/${id}/stop`, '');
  }

}
