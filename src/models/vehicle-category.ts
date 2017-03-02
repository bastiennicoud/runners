export class VehicleCategory {

  public type: string;
  public description: string;

  static build(data: any): VehicleCategory {
    if (!data) return null;

    const vc = new VehicleCategory;
    vc.type = data.type || null;
    vc.description = data.description || null;

    return vc;
  }
}
