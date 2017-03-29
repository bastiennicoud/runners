import { VehicleCategory } from './vehicle-category';
import { Vehicle } from './vehicle';
import { User } from './user';

/**
 * a Runner is a convoy, it belongs to a run
 *
 * @export
 * @class Runner
 */
export class Runner {

  /**
   * Uniq identifier of the runner
   *
   * @type {string}
   * @memberOf Runner
   */
  public id: string;

  /**
   * The category of vehicle should use for this runner
   *
   * @type {VehicleCategory}
   * @memberOf Runner
   */
  public vehicleCategory?: VehicleCategory;

  /**
   * The user who do this run
   *
   * @type {User}
   * @memberOf Runner
   */
  public user?: User;

  /**
   * The vehicle that used for this run
   *
   * @type {Vehicle}
   * @memberOf Runner
   */
  public vehicle?: Vehicle;

  /**
   * Factory that uses json data for build Runner instance
   *
   * @static
   * @param {*} data
   * @returns {Runner}
   *
   * @memberOf Runner
   */
  static build(data: any): Runner {
    if (!data) return null;

    const r = new Runner;
    r.id = data.id || data._id;
    r.vehicleCategory = VehicleCategory.build(data.vehicle_category);
    r.user = User.build(data.user);
    r.vehicle = Vehicle.build(data.vehicle);

    return r;
  }

}
