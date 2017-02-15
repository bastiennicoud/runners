import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpService } from './http.service';
import { BaseUrlService } from './base.url.service';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs';
import { Run } from '../models/run';

export { Run };

@Injectable()
export class RunService extends BaseUrlService {
    constructor(public http: HttpService, public platform: Platform) {
        super(platform);
    }

    all(): Observable<Run[]> {
        return this.http.get(`${this.BASE_URL}/runs`)
            .map(this.extractDatas)
            .catch(this.handleError);
    }

    get(id: number): Observable<Run> {
        return this.http.get(`${this.BASE_URL}/runs/${id}`)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response): Run {
        let data = res.json();
        let result = new Run(data);
        return result || null;
    }


    private extractDatas(res: Response): Run[] {
        let data = res.json();
        let result = [];
        data.forEach(element => {
            result.push(new Run(element))
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
        return Observable.throw(errMsg);
    }
}
