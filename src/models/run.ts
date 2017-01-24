import { RunGeocoderResult } from './run.geocoder.result';
import { Runners } from './runners';

export class Run {
    id: number;
    geo: RunGeocoderResult[];
    start_at: Date;
    end_at: Date;
    status: number;
    runners: Runners[];
}
