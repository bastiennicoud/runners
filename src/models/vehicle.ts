import { VehicleCategory } from './vehicle-category';

export class Vehicle {

  public id: string;
  public num: string;
  public type: VehicleCategory;
  public plateNumber: string;
  public nbPlace: number;

  get name(): string {
    return `${this.type.type || 'Véhicule'} ${this.num}`;
  }

  static build(data: any): Vehicle {
    if (!data) return null;

    const v = new Vehicle;
    v.id = data.id || data._id;
    v.num = data.num;
    v.type = VehicleCategory.build(data.type);
    v.plateNumber = data.plate_number;
    v.nbPlace = data.nb_place;

    return v;
  }
}
