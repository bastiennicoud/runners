import { VehicleCategory } from './vehicle-category';
import { Vehicle } from './vehicle';
import { User } from './user';

export class Runner {

  public id: string;
  public vehicleCategory: VehicleCategory;
  public user?: User;
  public vehicle?: Vehicle;

  static build(data: any): Runner {
    if (!data) return null;

    const r = new Runner;
    r.id = data.id || data._id;
    r.vehicleCategory = VehicleCategory.build(data.vehicle_category);
    r.user = User.build(data.user);
    r.vehicle = Vehicle.build(data.vehicle);

    return r;
  }

}
