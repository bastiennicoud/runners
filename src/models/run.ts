import { Waypoint } from './waypoint';
import { Runner } from './runner';

import { RunStatusEnum } from '../enums/run-status.enum';

export class Run {

  public id: string;
  public title: string;
  public beginAt: Date;
  public startAt?: Date;
  public endAt?: Date;

  public waypoints: Waypoint[];
  public runners: Runner[];

  static build(data: any): Run {
    if (!data) return null;

    const b = new Run;
    b.id = data.id || data._id;
    b.title = data.title || null;
    b.beginAt = new Date(data.begin_at);
    b.startAt = data.start_at ? new Date(data.start_at) : null;
    b.endAt = data.end_at ? new Date(data.end_at) : null;
    b.waypoints = data.waypoints.map(d => Waypoint.build(d)) || [];
    b.runners = data.runners.map(d => Runner.build(d)) || [];

    return b;
  }

  get empty(): boolean {
    return !this.runners.filter(r => r.user || r.vehicle).length;
  }

  get organizingUsers(): boolean {
    return !!this.runners.filter(r => !r.user).length;
  }

  get organizingVehicles(): boolean {
    return !!this.runners.filter(r => !r.vehicle).length;
  }

  get ready(): boolean {
    return !this.runners.filter(r => !r.user || !r.vehicle).length;
  }

  get inProgress(): boolean {
    return !!this.startAt;
  }

  get completed(): boolean {
    return !!this.endAt;
  }

  get problem(): boolean {
    return false;
  }

  get status(): RunStatusEnum {
    if (this.problem) return RunStatusEnum.problem;
    else if (this.completed) return RunStatusEnum.completed;
    else if (this.inProgress) return RunStatusEnum.inProgress;
    else if (this.ready) return RunStatusEnum.ready;
    else if (this.empty) return RunStatusEnum.empty;
    else if (this.organizingUsers) return RunStatusEnum.organizingUsers;
    else if (this.organizingVehicles) return RunStatusEnum.organizingVehicles;
    else throw new Error(`Run #${this.id} has no status, it's weird`);
  }

}
