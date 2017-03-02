import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from './http.service';
import { Runner } from '../models/runner';
import { Vehicle } from '../models/vehicle';

export { Runner };

@Injectable()
export class RunnerService {

  constructor(private httpService: HttpService) {}

  get(id: string): Observable<Runner> {
    return this.httpService
      .get(`/runners/${id}`)
      .map(data => data.json())
      .map(data => Runner.build(data));
  }

  takeVehicle(runner: Runner, vehicle: Vehicle): Observable<Runner> {
    return this.httpService
      .post(`/runners/${runner.id}/vehicles/${vehicle.id}`, null)
      .map(data => data.json())
      .map(data => Runner.build(data));
  }

  availableVehicles({ id }: Runner): Observable<Vehicle[]> {
    return this.httpService
      .get(`/runners/${id}/vehicles/available`)
      .map(data => data.json())
      .map(datas => datas.map(data => Vehicle.build(data)));
  }

}
