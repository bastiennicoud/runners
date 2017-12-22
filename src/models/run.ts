import { Waypoint } from './waypoint'
import { Runner } from './runner'

import { RunStatusEnum } from '../enums/run-status.enum'

/**
 * a Run is the equivalent to the physical little physical cards on the board
 *
 * @export
 * @class Run
 */
export class Run {
  /**
   * Unique identifier of the run
   *
   * @type {string}
   * @memberOf Run
   */
  public id: string

  /**
   * Title of the run, generally this is the name of artist
   *
   * @type {string}
   * @memberOf Run
   */
  public title: string

  /**
   * The "expected" date, when the run should start
   *
   * @type {Date}
   * @memberOf Run
   */
  public beginAt: Date

  /**
   * The date, when the run was started
   *
   * @type {Date}
   * @memberOf Run
   */
  public startAt?: Date

  /**
   * The date, when the run was ended
   *
   * @type {Date}
   * @memberOf Run
   */
  public endAt?: Date

  /**
   * List of waypoints that drivers must follow
   *
   * @type {Waypoint[]}
   * @memberOf Run
   */
  public waypoints: Waypoint[]

  /**
   * List of convoys that attends to the run
   *
   * @type {Runner[]}
   * @memberOf Run
   */
  public runners: Runner[]
  public _status: string;

  /**
   * Factory that uses json data for build Run instance
   *
   * @static
   * @param {*} data
   * @returns {Run}
   *
   * @memberOf Run
   */
  static build(data: any): Run {
    if (!data) return null

    const b = new Run()
    b.id = data.id || data._id
    b.title = data.title || null
    b.beginAt = new Date(data.begin_at)
    b.startAt = data.start_at ? new Date(data.start_at) : null
    b.endAt = data.end_at ? new Date(data.end_at) : null
    b.waypoints = data.waypoints.map(d => Waypoint.build(d)) || []
    b.runners = data.runners.map(d => Runner.build(d)) || []
    b._status = data.status;
    return b
  }

  /**
   * Does the run is empty ?
   * no drivers, no vehicles
   *
   * @readonly
   * @type {boolean}
   * @memberOf Run
   */
  get empty(): boolean {
    return this._status === "empty";
    // return !this.runners.filter(r => r.user || r.vehicle).length
  }

  /**
   * Does the run still needs drivers
   *
   * @readonly
   * @type {boolean}
   * @memberOf Run
   */
  get organizingUsers(): boolean {
    return !!this.runners.filter(r => !r.user).length
  }

  /**
   * Does the run still needs vehicles
   *
   * @readonly
   * @type {boolean}
   * @memberOf Run
   */
  get organizingVehicles(): boolean {
    return this._status === "needs_filling" //TODO remove this is temporary
    // return !!this.runners.filter(r => !r.vehicle).length
  }

  /**
   * Does the run is ready to start
   *
   * @readonly
   * @type {boolean}
   * @memberOf Run
   */
  get ready(): boolean {
    return this._status === "ready"
  }

  /**
   * Does the run is in progress
   *
   * @readonly
   * @type {boolean}
   * @memberOf Run
   */
  get inProgress(): boolean {
    return !!this.startAt
  }

  /**
   * Does the run is finished
   *
   * @readonly
   * @type {boolean}
   * @memberOf Run
   */
  get completed(): boolean {
    return !!this.endAt
  }

  /**
   * Does the run is in critical condition
   *
   * @readonly
   * @type {boolean}
   * @memberOf Run
   */
  get problem(): boolean {
    return this._status === "error";
  }

  /**
   * Give the current status of run
   *
   * @readonly
   * @type {RunStatusEnum}
   * @memberOf Run
   */
  get status(): RunStatusEnum {
    console.log(this)
    console.log(this._status)
    console.log(this.inProgress)
    console.log(this.organizingUsers)
    console.log(this.organizingVehicles)
    if (this.problem) return RunStatusEnum.problem
    else if (this.completed) return RunStatusEnum.completed
    else if (this.inProgress) return RunStatusEnum.inProgress
    else if (this.empty) return RunStatusEnum.empty
    else if (this.ready) return RunStatusEnum.ready
    else if (this.organizingUsers) return RunStatusEnum.organizingUsers
    else if (this.organizingVehicles) return RunStatusEnum.organizingVehicles
    else throw new Error(`Run #${this.id} has no status, it's weird`)
  }

  missingUsers(): boolean {
    return this.runners.filter(runner => runner.user == null).length >= 0
  }
}
