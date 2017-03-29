import { Run } from './run';

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
  public id: string;

  /**
   * Firstname of the user
   *
   * @type {string}
   * @memberOf User
   */
  public firstname: string;

  /**
   * Lastname of the user
   *
   * @type {string}
   * @memberOf User
   */
  public lastname: string;

  /**
   * Phonenumber of the user
   *
   * @type {string}
   * @memberOf User
   */
  public phoneNumber: string;

  /**
   * Profile image of the user
   *
   * @type {string}
   * @memberOf User
   */
  public image_profile: string;

  /**
   * Get fullname by concating of firstname and lastname
   *
   * @readonly
   *
   * @memberOf User
   */
  get fullname() {
    return `${this.firstname} ${this.lastname}`;
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
    if (!data) return null;

    let u = new User;
    u.id = data._id || data.id;
    u.firstname = data.firstname || null;
    u.lastname = data.lastname || null;
    u.phoneNumber = data.phone_number || null;
    u.image_profile = data.image_profile || "assets/user.jpg";

    return u;
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
    return !!run.runners.filter(runner => runner.user && runner.user.id == this.id).length;
  }

}
