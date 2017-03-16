import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import { RunService, Run } from '../../services/run.service';
import { AuthStorage } from '../../storages/auth.storage';
import { RunnerPage } from '../runner/runner';
import { Runner } from '../../models/runner'; // FIXME: is this the proper way ? (maybe get Runner from RunnerPage or RunService)
import { RunStatusEnum } from '../../enums/run-status.enum';

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

  loadRun() {
    return this.runService.get(this.navParams.get('id')).do(run => this.run = run);
  }

  refreshRun(refresher) {
    this.loadRun().subscribe(
      null,
      err => err.status != 401 && refresher.cancel(),
      () => refresher.complete()
    );
  }

  showRunner({ id }: Runner) {
    this.navCtrl.push(RunnerPage, { id });
  }

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
