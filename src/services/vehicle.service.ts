import { Injectable } from '@angular/core';
import { Response, URLSearchParams } from '@angular/http';
import { HttpService } from './http.service';
import { BaseUrlService } from './base.url.service';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs';
import { Vehicle, User, VehicleStatus } from '../models/vehicle.status';

export { Vehicle, User, VehicleStatus };

@Injectable()
export class VehicleService extends BaseUrlService {
    constructor(public http: HttpService, public platform: Platform) {
        super(platform);
    }

    all(status?: string): Observable<Vehicle[]> {
        var params = new URLSearchParams();
        if (status != null) params.set('status', status);
        return this.http.get(`${this.BASE_URL}/vehicles${params}`)
            .map(this.extractDatas)
            .catch(this.handleError);
    }

    get(id: number): Observable<Vehicle> {
        return this.http.get(`${this.BASE_URL}/vehicles/${id}`)
            .map(this.extractData)
            .catch(this.handleError);
    }

    status(): Observable<VehicleStatus[]>{
        return this.http.get(`${this.BASE_URL}/status/vehicles`)
            .map(this.extractVehiclesData)
            .catch(this.handleError);
    }

    private extractVehiclesData(res: Response): VehicleStatus[]{
        let data = res.json();
        let result = [];
        data.forEach(element => {
            result.push(new VehicleStatus(element))
        });
        return result || [];
    }

    private extractData(res: Response): Vehicle {
        let data = res.json();
        let result = new Vehicle(data);
        return result || null;
    }


    private extractDatas(res: Response): Vehicle[] {
        let data = res.json();
        let result = [];
        data.forEach(element => {
            result.push(new Vehicle(element))
        });
        return result || [];
    }

    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error("User service : ", error);
        return Observable.throw(errMsg);
    }
}
