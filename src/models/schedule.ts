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
  public start_at: Date;

  /**
   * Firstname of the user
   *
   * @type {Date}
   * @memberOf Schedule
   */
  public end_at: Date;



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
    console.log("MAIS TAMER")
    let u = new Schedule();
    u.start_at = new Date(data.start_at);
    u.end_at = new Date(data.end_at);
    return u;
  }

}
