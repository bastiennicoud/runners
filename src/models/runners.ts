import { User } from './user';
import { Vehicle } from './vehicle';
import { VehicleStatus } from './vehicle.status';

export { User, Vehicle }

export class Runners {
    user: User;
    vehicle: Vehicle;
    vehicleStatus: VehicleStatus;

    constructor(data: any) {
        this.user = null;
        if(data.user != null) this.user = new User(data.user);

        this.vehicle = null;
        if(data.vehicle != null) this.vehicle = new Vehicle(data.vehicle)   
        
        this.vehicleStatus = null;
        if(data.vehicle != null) this.vehicleStatus = new VehicleStatus(data.vehicle_category);
    }

    public static fromList(runners: any): Runners[] {
        let temp: Runners[] = [];
        runners.forEach((obj) => {
            temp.push(new Runners(obj));
        });
        return temp;
    }

}
