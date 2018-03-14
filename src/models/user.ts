import { Run } from './run'
import { DriverStatusEnum } from '../enums/driver-status.enum'
/**
 * User is the driver who do the run
 *
 * @export
 * @class User
 */
export class User {
  /**
   * Uniq identifier of the user
   *
   * @type {string}
   * @memberOf User
   */
  public id: string

  /**
   * Firstname of the user
   *
   * @type {string}
   * @memberOf User
   */
  public firstname: string

  /**
   * Lastname of the user
   *
   * @type {string}
   * @memberOf User
   */
  public lastname: string

  /**
   * Phonenumber of the user
   *
   * @type {string}
   * @memberOf User
   */
  public phoneNumber: string

  /**
   * Profile image of the user
   *
   * @type {string}
   * @memberOf User
   */
  public image_profile: string

  /**
   * Status of the user
   *
   * @type {string}
   * @memberOf User
   */
  private _status: string

  /**
   * Get fullname by concating of firstname and lastname
   *
   * @readonly
   *
   * @memberOf User
   */
  get fullname() {
    return `${this.firstname} ${this.lastname}`
  }

  /**
   * Factory that uses json data for build User instance
   *
   * @static
   * @param {*} data
   * @returns {User}
   *
   * @memberOf User
   */
  static build(data: any): User {
    if (!data) return null

    let u = new User()
    u.id = data._id || data.id
    u.firstname = data.firstname || null
    u.lastname = data.lastname || null
    u.phoneNumber = data.phone_number || null
    u.image_profile = data.image_profile || 'assets/user.jpg'
    u._status = data.status || 'free'

    return u
  }

  get taken(): boolean {
    return this._status === 'taken'
  }

  get free(): boolean {
    return this._status === 'free'
  }

  get status(): DriverStatusEnum {
    if (this.taken) return DriverStatusEnum.taken
    else if (this.free) return DriverStatusEnum.free
    else if (this._status === null)
      return DriverStatusEnum.free // TODO rem
    else throw new Error(`User #${this.id} has no status. it's weird`)
  }

  /**
   * Test if user belongs to a run
   *
   * @param {Run} run
   * @returns {boolean}
   *
   * @memberOf User
   */
  belongsToRun(run: Run): boolean {
    return !!run.runners.filter(
      runner => runner.user && runner.user.id == this.id
    ).length
  }
}
