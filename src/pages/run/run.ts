import { Component } from '@angular/core'
import {
  NavController,
  NavParams,
  LoadingController,
  AlertController,
} from 'ionic-angular'

import { RunService, Run } from '../../services/run.service'
import { AuthStorage } from '../../storages/auth.storage'
import { RunnerPage } from '../runner/runner'
import { RunStatusEnum } from '../../enums/run-status.enum'
import { InternetStatusProvider } from '../../providers/internet-status/internet-status'
import { User } from '../../models/user'
import { Vehicle } from '../../services/vehicle.service'
import { RunnerService, Runner } from '../../services/runner.service'
import { Observable } from 'rxjs'
import { ProfilPage } from '../profil/profil'

/**
 * This class displays the details of a run when selected from the board
 *
 * @export
 * @class RunPage
 */
@Component({
  selector: 'page-run',
  templateUrl: 'run.html',
})
export class RunPage {
  run: Run
  RunStatusEnum = RunStatusEnum
  user: User
  runner: Runner
  availableVehicles: Vehicle[]

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private navParams: NavParams,
    private loadingCtrl: LoadingController,
    private runService: RunService,
    private authStorage: AuthStorage,
    private InternetStatus: InternetStatusProvider,
    private runnerService: RunnerService
  ) {}

  ionViewWillEnter() {
    this.user = this.authStorage.user

    const loader = this.loadingCtrl.create({ content: 'Chargement ...' })
    loader.present().then(() => {
      this.loadRun().subscribe(
        () => loader.dismiss().catch(err => console.log(err)),
        err =>
          err.status != 401 && loader.dismiss().catch(err => console.log(err)) //TODO temporary dismiss
      )
    })
  }

  ionViewWillLeave() {}

  /**
   * Load the datas of the run
   *
   * @returns
   *
   * @memberOf RunPage
   */
  loadRun() {
    return this.runService
      .get(this.navParams.get('id'))
      .do(run => (this.run = run))
      .do(r => console.log('LOADED RUN ', r))
  }

  alreadyInRun() {
    return this.run.runners
      .map(a => a.user.id === this.authStorage.user.id)
      .indexOf(true) !== -1
  }

  /**
   * Pull to refresh to actualize the view according to the new datas on the backend
   *
   * @param {any} refresher
   *
   * @memberOf RunPage
   */
  refreshRun(refresher) {
    this.loadRun().subscribe(
      null,
      err => err.status != 401 && refresher.cancel(),
      () => refresher.complete()
    )
  }

  /**
   * Show the view for the convoy selected
   *
   * @param {Runner} { id }
   *
   * @memberOf RunPage
   */
  showRunner({ id, user }: Runner, { title }: Run) {
    if (this.InternetStatus.getConnectionStatus())
      this.navCtrl.push(RunnerPage, { id, title })
  }

  /**
   * Method to start the run (assign the current user) with a confirmation box
   *
   *
   * @memberOf RunPage
   */
  start() {
    if (!this.InternetStatus.getConnectionStatus()) return

    this.alertCtrl
      .create({
        title: 'Démarrer le run ?',
        message:
          'Assurez-vous que tous les autres chauffeurs sont prêts à partir !',
        buttons: [
          {
            text: 'Annuler',
          },
          {
            text: 'Confirmer',
            handler: () => {
              this.runService.start(this.run).subscribe()
            },
          },
        ],
      })
      .present()
  }

  /**
   * Method to mark the run as finished with a confirmation box
   *
   *
   * @memberOf RunPage
   */
  stop() {
    if (!this.InternetStatus.getConnectionStatus()) return

    this.alertCtrl
      .create({
        title: 'Terminer le run ?',
        message:
          'Assurez-vous que tous les autres chauffeurs aillent aussi fini !',
        buttons: [
          {
            text: 'Annuler',
          },
          {
            text: 'Confirmer',
            handler: () => {
              this.runService.stop(this.run).subscribe()
            },
          },
        ],
      })
      .present()
  }

  /**
   * Load the data of the runner
   *
   * @returns {Observable<Runner>}
   *
   * @memberOf RunPage
   */
  loadRunner(): Observable<Runner> {
    return this.runnerService
      .get(this.navParams.get('id'))
      .do(runner => (this.runner = runner))
      .do(runner => console.log(runner))
      .do(runner => !runner.vehicle && this.loadAvailableVehicles().subscribe())
  }

  /**
   * Load the vehicles availables
   *
   * @returns {Observable<Vehicle[]>}
   *
   * @memberOf RunPage
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
   * @memberOf RunPage
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
   * @memberOf RunPage
   */
  selectUser(runner): void {
    const loader = this.loadingCtrl.create({ content: 'Traitement ...' })
    loader.present()

    this.runnerService
      .setUser(runner, this.authStorage.user)
      .subscribe(
        r => (runner = r),
        err => err.status != 401 && loader.dismiss(),
        () => loader.dismiss()
      )
  }

  /**
   * Assign a vehicle to the convoy
   *
   * @param {Vehicle} vehicle
   *
   * @memberOf RunPage
   */
  selectVehicle(vehicle: Vehicle): void {
    const loader = this.loadingCtrl.create({ content: 'Traitement ...' })
    loader.present()

    this.runnerService.setVehicle(this.runner, vehicle).subscribe(
      // runner => (this.runner = runner),
      runner => {},
      err => err.status != 401 && loader.dismiss(),
      () => loader.dismiss()
    )
  }

  /**
   * Display the profil page of the user
   *
   * @param {User} { id }
   *
   * @memberOf RunPage
   */
  showProfil({ id }: User): void {
    this.navCtrl.push(ProfilPage, { id })
  }
}
