import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs';

import { RunnerService, Runner } from '../../services/runner.service';
import { UserService, User } from '../../services/user.service';
import { ProfilPage } from '../profil/profil';

import { Vehicle } from '../../models/vehicle';

@Component({
  selector: 'page-runner',
  templateUrl: 'runner.html'
})
export class RunnerPage {

  runner: Runner;
  availableVehicles: Vehicle[];

  constructor(private navCtrl: NavController, private navParams: NavParams, private loadingCtrl: LoadingController, private runnerService: RunnerService, private userService: UserService) {
    const loader = this.loadingCtrl.create({ content: 'Chargement ...' });
    loader.present();
    this.loadRunner().subscribe(
      null,
      err => err.status != 401 && loader.dismiss(),
      () => loader.dismiss()
    );
  }

  loadRunner(): Observable<Runner> {
    return this.runnerService.get(this.navParams.get('id'))
      .do(runner => this.runner = runner)
      .do(runner => !runner.vehicle && this.loadAvailableVehicles().subscribe());
  }

  loadAvailableVehicles(): Observable<Vehicle[]> {
    return this.runnerService.availableVehicles(this.runner)
      .do(vehicles => this.availableVehicles = vehicles);
  }

  refreshRunner(refresher): void {
    this.loadRunner().subscribe(
      null,
      err => err.status != 401 && refresher.cancel(),
      () => refresher.complete()
    );
  }

  takeRunner(runner: Runner): void {
    const loader = this.loadingCtrl.create({ content: 'Traitement ...' });
    loader.present();

    this.userService.takeRunner(runner).subscribe(
      runner => this.runner = runner,
      err => !console.log(err) && loader.dismiss(),
      () => loader.dismiss()
    );
  }

  selectVehicle(vehicle: Vehicle): void {
    const loader = this.loadingCtrl.create({ content: 'Traitement ...' });
    loader.present();

    this.runnerService.takeVehicle(this.runner, vehicle).subscribe(
      runner => this.runner = runner,
      err => !console.log(err) && loader.dismiss(),
      () => loader.dismiss()
    );
  }

  showProfil({ id }: User): void {
    this.navCtrl.push(ProfilPage, {id});
  }

}
