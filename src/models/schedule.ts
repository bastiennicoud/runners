/**
 * User is the driver who do the run
 *
 * @export
 * @class User
 */
export class Schedule {

  /**
   * Uniq identifier of the user
   *
   * @type {Date}
   * @memberOf Schedule
   */
  public startAt: Date;

  /**
   * Firstname of the user
   *
   * @type {Date}
   * @memberOf Schedule
   */
  public endAt: Date;



  /**
   * Factory that uses json data for build User instance
   *
   * @static
   * @param {*} data
   * @returns {User}
   *
   * @memberOf User
   */
  static build(data: any): Schedule {
    if (!data) return null;
    let u = new Schedule();
    u.startAt = new Date(data.start_at);
    u.endAt = new Date(data.end_at);
    return u;
  }

}
