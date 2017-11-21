import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import { RunService, Run } from '../../services/run.service';
import { AuthStorage } from '../../storages/auth.storage';
import { RunnerPage } from '../runner/runner';
import { Runner } from '../../models/runner'; // FIXME: is this the proper way ? (maybe get Runner from RunnerPage or RunService)
import { RunStatusEnum } from '../../enums/run-status.enum';

/**
 * This class displays the details of a run when selected from the board
 *
 * @export
 * @class RunPage
 */
@Component({
  selector: 'page-run',
  templateUrl: 'run.html'
})
export class RunPage {

  run: Run;
  RunStatusEnum = RunStatusEnum;

  constructor(private navCtrl: NavController, private alertCtrl: AlertController, private navParams: NavParams, private loadingCtrl: LoadingController, private runService: RunService, private authStorage: AuthStorage) {
    const loader = this.loadingCtrl.create({ content: 'Chargement ...' });
    loader.present();
    this.loadRun().subscribe(
      null,
      err => err.status != 401 && loader.dismiss(),
      () => loader.dismiss()
    );
  }

/**
 * Load the datas of the run
 *
 * @returns
 *
 * @memberOf RunPage
 */
  loadRun() {
    return this.runService.get(this.navParams.get('id')).do(run => this.run = run);
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
    );
  }

/**
 * Show the view for the convoy selected
 *
 * @param {Runner} { id }
 *
 * @memberOf RunPage
 */
  showRunner({ id }: Runner, {title}:Run) {
    this.navCtrl.push(RunnerPage, { id, title });
  }

/**
 * Method to start the run (assign the current user) with a confirmation box
 *
 *
 * @memberOf RunPage
 */
  start() {
    this.alertCtrl.create({
      title: 'Démarrer le run ?',
      message: 'Assurez-vous que tous les autres chauffeurs sont prêts à partir !',
      buttons: [
        {
          text: 'Annuler',
        },
        {
          text: 'Confirmer',
          handler: () => {
            this.runService.start(this.run).subscribe();
          },
        },
      ],
    }).present();
  }

/**
 * Method to mark the run as finished with a confirmation box
 *
 *
 * @memberOf RunPage
 */
  stop() {
    this.alertCtrl.create({
      title: 'Terminer le run ?',
      message: 'Assurez-vous que tous les autres chauffeurs aillent aussi fini !',
      buttons: [
        {
          text: 'Annuler',
        },
        {
          text: 'Confirmer',
          handler: () => {
            this.runService.stop(this.run).subscribe();
          }
        },
      ],
    }).present();
  }

}
