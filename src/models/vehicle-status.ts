import { Vehicle } from './vehicle';
import { User } from './user';

import { VehicleStatusEnum } from '../enums/vehicle-status.enum';

/**
 * The status of a vehicle
 *
 * @export
 * @class VehicleStatus
 */
export class VehicleStatus {

  /**
   * The vehicle concerned by this status
   *
   * @type {Vehicle}
   * @memberOf VehicleStatus
   */
  public vehicle: Vehicle;

  /**
   * Who drives the vehicle if it's taken
   *
   * @type {User}
   * @memberOf VehicleStatus
   */
  public user: User;

  /**
   * Factory that uses json data for build VehicleStatus instance
   *
   * @static
   * @param {*} data
   * @returns {VehicleStatus}
   *
   * @memberOf VehicleStatus
   */
  static build(data: any): VehicleStatus {
    if (!data) return null;

    const vs = new VehicleStatus;
    vs.vehicle = Vehicle.build(data.vehicle);
    vs.user = User.build(data.user);

    return vs;
  }

  /**
   * Is the vehicle free ?
   *
   * @readonly
   * @type {boolean}
   * @memberOf VehicleStatus
   */
  get free(): boolean {
    return !this.user;
  }

  /**
   * Is the vehicle taken ?
   *
   * @readonly
   * @type {boolean}
   * @memberOf VehicleStatus
   */
  get taken(): boolean {
    return !!this.user;
  }

  /**
   * Give the current status of the VehicleStatus
   *
   * @readonly
   * @type {VehicleStatusEnum}
   * @memberOf VehicleStatus
   */
  get status(): VehicleStatusEnum {
    if (this.taken) return VehicleStatusEnum.taken;
    else if (this.free) return VehicleStatusEnum.free;
    else throw new Error(`VehicleStatus has no status, it's weird`);
  }

}
