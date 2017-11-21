import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from './http.service';
import { Vehicle } from '../models/vehicle';
import { VehicleStatus } from '../models/vehicle-status';

export { Vehicle, VehicleStatus };

/**
 * Retrive one or all Vehicle.
 *
 * @export
 * @class VehicleService
 */
@Injectable()
export class VehicleService {

  constructor(private httpService: HttpService) {}

  all(): Observable<Vehicle[]> {
    return this.httpService
      .get('/vehicles')
      .map(data => data.json())
      .map(array => array.map(data => Vehicle.build(data)));
  }

  get(id: string): Observable<Vehicle> {
    return this.httpService
      .get(`/vehicles/${id}`)
      .map(data => data.json())
      .map(data => Vehicle.build(data));
  }

  status(): Observable<VehicleStatus[]> {
    return this.httpService
      .get(`/vehicles`)
      .map(data => data.json())
      .map(data => data.map(d => VehicleStatus.build(d)));
  }

}
