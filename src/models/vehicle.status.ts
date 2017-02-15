import { Vehicle } from './vehicle';
import { User } from './user';

export { Vehicle, User }

export class VehicleStatus {
    id: number;
    vehicle: Vehicle;
    status: string;
    user: User;

    constructor(data: any) {
        this.id = data.id || data._id || null;
        this.status = data.status || null;

        if(data.vehicle){
            this.vehicle = new Vehicle(data.vehicle);
        }else{
            this.vehicle = null
        }

        if(data.user){
            this.user = new User(data.user)
        } else {
            this.user = null
        }
    }


}
