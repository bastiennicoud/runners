/**
 * The category of a vehicle
 *
 * @export
 * @class VehicleCategory
 */
export class VehicleCategory {

  /**
   * Uniq identifier of the category
   *
   * @type {string}
   * @memberOf VehicleCategory
   */
  public id: string;

  /**
   * Name of the category
   *
   * @type {string}
   * @memberOf VehicleCategory
   */
  public type: string;

  /**
   * description of the category
   *
   * @type {string}
   * @memberOf VehicleCategory
   */
  public description: string;

  /**
   * Factory that uses json data for build VehicleCategory instance
   *
   * @static
   * @param {*} data
   * @returns {VehicleCategory}
   *
   * @memberOf VehicleCategory
   */
  static build(data: any): VehicleCategory {
    if (!data) return null;

    const vc = new VehicleCategory;
    vc.type = data.type || null;
    vc.description = data.description || null;

    return vc;
  }

}
