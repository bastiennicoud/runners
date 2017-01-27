import { User } from './user';
import { Vehicle } from './vehicle';

export class Runners {
    user: User;
    vehicle: Vehicle;

    constructor(data:any){
        this.user = new User(data.runner) || null;
        this.vehicle = new Vehicle(data.vehicle) || null;
    }

    public static fromList(runners: any): Runners[]{
        let temp:Runners[] = [];
        runners.forEach((obj) =>{
            temp.push(new Runners(obj));
        });
        return temp;
    }

}
