/**
 * A waypoint is a geographical point that drivers must go on during a run
 *
 * @export
 * @class Waypoint
 */
export class Waypoint {

  /**
   * The label of the geographical point
   *
   * @type {string}
   * @memberOf Waypoint
   */
  public nickname: string;

  /**
   * The google object that define geographical point
   * Like it describes here : https://developers.google.com/maps/documentation/geocoding/intro?hl=FR#GeocodingResponses
   *
   * @type {*}
   * @memberOf Waypoint
   */
  public geocoder: any;

  /**
   * Factory that uses json data for build Waypoint instance
   *
   * @static
   * @param {*} data
   * @returns {Waypoint}
   *
   * @memberOf Waypoint
   */
  static build(data: any): Waypoint {
    if (!data) return null;

    let w = new Waypoint;
    w.nickname = data.nickname || null;
    w.geocoder = data.geocoder || data.geocode || null;

    return w;
  }

}
