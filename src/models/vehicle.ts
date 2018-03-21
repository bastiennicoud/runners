import { VehicleCategory } from './vehicle-category'
import { User } from './user'

import { VehicleStatusEnum } from '../enums/vehicle-status.enum'
import { Comment } from "./comment";
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
  public id: string

  /**
   * Number of the vehicle
   *
   * @type {string}
   * @memberOf Vehicle
   */
  public num: string

  /**
   * Category of the vehicle
   *
   * @type {VehicleCategory}
   * @memberOf Vehicle
   */
  public type: VehicleCategory

  /**
   * Plate number of the vehicle
   *
   * @type {string}
   * @memberOf Vehicle
   */
  public plateNumber: string

  /**
   * The number of people the car can contain (driver exclude)
   *
   * @type {number}
   * @memberOf Vehicle
   */
  public nbPlace: number

  /**
   * The driver of the vehicle
   *
   * @type {User}
   * @memberOf Vehicle
   */
  public user: User

  /**
   * Get the name of the vehicle
   *
   * @type {string}
   * @memberOf Vehicle
   */
  public name: string

  /**
   * Comments of a vehicle
   * @type { Comment[] }
   * @memberOf Vehicle
   */
  public comments : Comment[]

  private _status: string

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
    if (!data) return null

    const v = new Vehicle()
    v.id = data.id || data._id
    // v.num = data.num;
    v.name = data.name
    v.type = VehicleCategory.build(data.type)
    v.plateNumber = data.plate_number
    v.nbPlace = data.nb_place
    v.user = User.build(data.user)
    v._status = data.status
    v.comments = data.comments ? data.comments.map(d => Comment.build(d)) : []
    return v
  }

  /**
   * Check if the vehicle is free to use
   *
   * @readonly
   * @return { boolean }
   * @member Vehicle
   */
  get free(): boolean {
    return this._status === 'free'
  }

  /**
   * Check if the vehicle is taken
   *
   * @readonly
   * @return { boolean }
   * @member Vehicle
   */
  get taken(): boolean {
    return this._status === 'taken'
  }

  /**
   * Give the current status of vehicle
   *
   * @readonly
   * @type { VehicleStatusEnum }
   * @member Vehicle
   * @note for some reaon if I put status as the name of the function,
   *    nothing is displayed in the view :/
   */
  get state(): VehicleStatusEnum {
    if (this.free) return VehicleStatusEnum.free
    else if (this.taken) return VehicleStatusEnum.taken
    else throw new Error(`Vehicle #${this.id} has no status, it's weird`)
  }
}
