import { Component } from '@angular/core'
import { NavController, NavParams, LoadingController } from 'ionic-angular'
import { Observable } from 'rxjs'

import { RunnerService, Runner } from '../../services/runner.service'
import { UserService, User } from '../../services/user.service'
import { AuthStorage } from '../../storages/auth.storage'
import { ProfilPage } from '../profil/profil'
import { InternetStatusProvider } from '../../providers/internet-status/internet-status'

import { Vehicle } from '../../models/vehicle'
import { Run } from '../../models/run'

import debug from 'debug'

/**
 * This class displays the convoy selected
 *
 * @export
 * @class RunnerPage
 */
@Component({
  selector: 'page-runner',
  templateUrl: 'runner.html',
})
export class RunnerPage {
  runner: Runner
  run: Run
  availableVehicles: Vehicle[]

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private loadingCtrl: LoadingController,
    private runnerService: RunnerService,
    private userService: UserService,
    private authStorage: AuthStorage,
    private InternetStatus: InternetStatusProvider
  ) {}

  ionViewWillEnter() {
    if (!this.InternetStatus.getConnectionStatus()) {
      this.navCtrl.pop()
      return
    }

    const loader = this.loadingCtrl.create({ content: 'Chargement ...' })
    loader.present()

    this.run = this.navParams.get('title')
    this.loadRunner().subscribe(
      null,
      err =>
        err.status != 401 && loader.dismiss().catch(err => console.error(err)),
      () => loader.dismiss()
    )
  }

  ionViewWillLeave() {}

  /**
   * Load the data of the runner
   *
   * @returns {Observable<Runner>}
   *
   * @memberOf RunnerPage
   */
  loadRunner(): Observable<Runner> {
    return this.runnerService
      .get(this.navParams.get('id'))
      .do(runner => (this.runner = runner))
      .do(runner => debug('runner')('loaded : %O',runner))
      .do(runner => !runner.vehicle && this.loadAvailableVehicles().subscribe())
  }

  /**
   * Load the vehicles availables
   *
   * @returns {Observable<Vehicle[]>}
   *
   * @memberOf RunnerPage
   */
  loadAvailableVehicles(): Observable<Vehicle[]> {
    return this.runnerService
      .availableVehicles(this.runner)
      .do(vehicles => (this.availableVehicles = vehicles))
  }

  /**
   * Push to refresh the datas
   *
   * @param {any} refresher
   *
   * @memberOf RunnerPage
   */
  refreshRunner(refresher): void {
    this.loadRunner().subscribe(
      null,
      err => err.status != 401 && refresher.cancel(),
      () => refresher.complete()
    )
  }

  /**
   * Set the user for the convoy
   *
   *
   * @memberOf RunnerPage
   */
  selectUser(): void {
    const loader = this.loadingCtrl.create({ content: 'Traitement ...' })
    loader.present()

    this.runnerService
      .setUser(this.runner, this.authStorage.user)
      .subscribe(
        runner => (this.runner = runner),
        err => err.status != 401 && loader.dismiss(),
        () => loader.dismiss()
      )
  }

  /**
   * Assign a vehicle to the convoy
   *
   * @param {Vehicle} vehicle
   *
   * @memberOf RunnerPage
   */
  selectVehicle(vehicle: Vehicle): void {
    const loader = this.loadingCtrl.create({ content: 'Traitement ...' })
    loader.present()

    this.runnerService.setVehicle(this.runner, vehicle).subscribe(
      // runner => (this.runner = runner),
      runner => {
        debug('runner')('vehicle set')
      },
      err => err.status != 401 && loader.dismiss(),
      () => loader.dismiss()
    )
  }

  /**
   * Display the profil page of the user
   *
   * @param {User} { id }
   *
   * @memberOf RunnerPage
   */
  showProfil({ id }: User): void {
    this.navCtrl.push(ProfilPage, { id })
  }
}
