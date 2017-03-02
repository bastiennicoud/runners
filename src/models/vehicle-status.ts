import { Vehicle } from './vehicle';
import { User } from './user';

import { VehicleStatusEnum } from '../enums/vehicle-status.enum';

export class VehicleStatus {

  public vehicle: Vehicle;
  public user: User;

  static build(data: any): VehicleStatus {
    if (!data) return null;

    const vs = new VehicleStatus;
    vs.vehicle = Vehicle.build(data.vehicle);
    vs.user = User.build(data.user);

    return vs;
  }

  get free(): boolean {
    return !this.user;
  }

  get taken(): boolean {
    return !!this.user;
  }

  get status(): VehicleStatusEnum {
    if (this.taken) return VehicleStatusEnum.taken;
    else if (this.free) return VehicleStatusEnum.free;
    else throw new Error(`VehicleStatus has no status, it's weird`);
  }
}
