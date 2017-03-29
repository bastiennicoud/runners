import { Injectable, Pipe } from '@angular/core';

import { VehicleStatus } from '../models/vehicle-status';

@Pipe({
  name: 'groupVehicleStatus'
})
@Injectable()
export class GroupVehicleStatusPipe {

  transform(vehicleStatus: VehicleStatus[]): any[] {
    const groupedVehicleStatus = vehicleStatus.reduce((prev: any[], cur: VehicleStatus) => {
      const key = cur.vehicle.type.type;
      if (!prev[key]) prev[key] = { type: cur.vehicle.type, vehicleStatus: [cur] };
      else prev[key].vehicleStatus.push(cur);
      return prev;
    }, []);
    return Object.keys(groupedVehicleStatus).map(key => {
      const { type, vehicleStatus } = groupedVehicleStatus[key];
      return { type, vehicleStatus };
    });
  }

}
