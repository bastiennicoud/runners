import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from './http.service';
import { Runner } from '../models/runner';
import { Vehicle } from '../models/vehicle';
import { User } from '../models/user';

export { Runner };

/**
 * Allows to modify the convoy.
 * This is the runner pair (user) with a vehicle inside a run.
 * @see {Runner}
 * @export
 * @class RunnerService
 */
@Injectable()
export class RunnerService {

  constructor(private httpService: HttpService) {}

  /**
   * Get one runner
   *
   * @param {string} id Unique identifier of the runner
   * @returns {Observable<Runner>}
   *
   * @memberOf RunnerService
   */
  get(id: string): Observable<Runner> {
    return this.httpService
      .get(`/runners/${id}`)
      .map(data => Runner.build(data));
  }

/**
 * Link a vehicle to the runner.
 *
 * @param {Runner} runner
 * @param {Vehicle} vehicle
 * @returns {Observable<Runner>}
 *
 * @memberOf RunnerService
 */
  setVehicle({ id }: Runner, vehicle: Vehicle): Observable<Runner> {
    return this.httpService
      .patch(`/runners/${id}`, JSON.stringify({
        vehicle,
      }))
      .map(data => Runner.build(data));
  }

  /**
 * The authenticated user will join the run
 *
 * @param {Runner} { id }
 * @param {User} user
 * @returns {Observable<Runner>}
 *
 * @memberOf UserService
 */
  setUser({ id }: Runner, user: User): Observable<Runner> {
    return this.httpService
      .patch(`/runners/${id}`, JSON.stringify({
        user: user.id,
      }))

      .map(data => Runner.build(data));
  }

/**
 * List all available vehicle for the given runner
 *
 * @param {Runner} { id }
 * @returns {Observable<Vehicle[]>}
 *
 * @memberOf RunnerService
 */
  availableVehicles({ id }: Runner): Observable<Vehicle[]> {
    return this.httpService
      .get(`/runners/${id}/vehicles?status=free`)
      .map(datas => datas.map(data => Vehicle.build(data)));
  }

}
