import { Component } from '@angular/core'
import {
  NavController,
  NavParams,
  LoadingController,
  AlertController,
} from 'ionic-angular'

import { RunService, Run } from '../../services/run.service'
import { AuthStorage } from '../../storages/auth.storage'

import { RunStatusEnum } from '../../enums/run-status.enum'
import { InternetStatusProvider } from '../../providers/internet-status/internet-status'
import { User } from '../../models/user'
import { Vehicle } from '../../services/vehicle.service'
import { RunnerService, Runner } from '../../services/runner.service'
import { Observable } from 'rxjs'
import { ProfilPage } from '../profil/profil'

import debug from 'debug'

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
      this.loadRun()
        .merge(this.loadAvailableVehicles())
        .subscribe(
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
      .do(r => debug('run')('Loaded %O ', r))
  }

  alreadyInRun() {
    return (
      this.run.runners
        .filter(a => a.user && a.user.id === this.authStorage.user.id)
        .length >= 1
    )
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
  loadRunner(id: Number | string): Observable<Runner> {
    return this.runnerService
      .get(String(id))
      .do(runner => console.log('RUNNER', runner))
      .do(runner => !runner.vehicle)
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
      .availableVehicles({})
      .do(vehicles => (this.availableVehicles = vehicles))
  }

  /**
   * Set the user for the convoy
   *
   *
   * @memberOf RunPage
   */
  selectUser(runner: Runner, select: any): void {}

  /**
   * Assign a vehicle to the convoy
   *
   * @param {Vehicle} vehicle
   *
   * @param runner
   * @memberOf RunPage
   */
  selectVehicle(vehicle: Vehicle, runner: Runner): void {
    const loader = this.loadingCtrl.create({ content: 'Traitement ...' })
    let observable = this.runnerService.setVehicle(runner, vehicle)

    /*observable = this.runnerService
      .setUser(runner, this.authStorage.user)
      .concat(observable)*/

    loader.present()
    observable.subscribe(
      // runner => (this.runner = runner),
      runner => {
        console.log(runner)
      },
      err => err.status != 401 && loader.dismiss(),
      () => loader.dismiss()
    )
  }
  assignRunner(runner : Runner){
    this.runnerService.setUser(runner, this.authStorage.user).subscribe(null,null,()=>this.refreshRun({cancel:function(){},complete:function(){}}));
  }
  belongsToRunner(runner:Runner) : Boolean{
      return runner.user!= null && runner.user.id == this.authStorage.user.id
  }
  canUpdateRunner(runner){
    console.log(this.availableVehicles && this.belongsToRunner(runner) && this.run.status != RunStatusEnum.completed)
    return this.availableVehicles && this.belongsToRunner(runner) && this.run.status != RunStatusEnum.completed
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
