import { VehicleCategory } from './vehicle-category';
import { User } from './user';

/**
 *
 * @export
 * @class Vehicle
 */
export class Vehicle {

  /**
   * Uniq identifier of the vehicle
   *
   * @type {string}
   * @memberOf Vehicle
   */
  public id: string;

  /**
   * Number of the vehicle
   *
   * @type {string}
   * @memberOf Vehicle
   */
  public num: string;

  /**
   * Category of the vehicle
   *
   * @type {VehicleCategory}
   * @memberOf Vehicle
   */
  public type: VehicleCategory;

  /**
   * Plate number of the vehicle
   *
   * @type {string}
   * @memberOf Vehicle
   */
  public plateNumber: string;

  /**
   * The number of people the car can contain (driver exclude)
   *
   * @type {number}
   * @memberOf Vehicle
   */
  public nbPlace: number;

  /**
   * The driver of the vehicle
   *
   * @type {User}
   * @memberOf Vehicle
   */
  public user: User;

  /**
   * Get the name of the vehicle by merging of category name and num
   *
   * @readonly
   * @type {string}
   * @memberOf Vehicle
   */
  get name(): string {
    return `${this.type.type || 'Véhicule'} ${this.num}`;
  }

  /**
   * Factory that uses json data for build Vehicle instance
   *
   * @static
   * @param {*} data
   * @returns {Vehicle}
   *
   * @memberOf Vehicle
   */
  static build(data: any): Vehicle {
    if (!data) return null;

    const v = new Vehicle;
    v.id = data.id || data._id;
    v.num = data.num;
    v.type = VehicleCategory.build(data.type);
    v.plateNumber = data.plate_number;
    v.nbPlace = data.nb_place;
    v.user = User.build(data.user);

    return v;
  }

}
