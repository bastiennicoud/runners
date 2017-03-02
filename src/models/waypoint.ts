export class Waypoint {

  public nickname: string;
  public geocoder: any;

  static build(data: any): Waypoint {
    if (!data) return null;

    let w = new Waypoint;
    w.nickname = data.nickname || null;
    w.geocoder = data.geocoder || data.geocode || null;

    return w;
  }

}
