import { RunGeocoderResult } from './run.geocoder.result';
import { Runners } from './runners';

export { RunGeocoderResult, Runners }

export class Run {
    id: number;
    geo: RunGeocoderResult[];
    start_at: Date;
    end_at: Date;
    status: number;
    runners: Runners[];

    constructor(data: any) {
        this.id = data.id || data._id;
        this.geo = data.geo || [];
        this.start_at = data.start_at || null;
        this.status = data.status || null;
        this.runners = Runners.fromList(data.runners) || null;
    }

}
