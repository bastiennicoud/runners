import { Component } from '@angular/core';
import { Vehicle, VehicleService } from '../../services/vehicle.service';
import { ProfilPage } from '../../pages/profil/profil';
import { User } from '../../models/user';
import { NavController, NavParams, LoadingController } from 'ionic-angular';


/**
 * This class displays the profile of a vehicle
 * 
 * @export
 * @class VehiclePage
 */
@Component({
  selector: 'page-vehicle',
  templateUrl: 'vehicle.html'
})

export class VehiclePage {

  vehicle: Vehicle = Vehicle.build(null);

  constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController, private vehicleService: VehicleService) {
    const loader = this.loadingCtrl.create({ content: 'Chargement ...'});
    loader.present();
    this.loadVehicleStatus().subscribe(
      null,
      err => err.status != 401 && loader.dismiss(),
      () => loader.dismiss()
    );
  }

  loadVehicleStatus() {
    return this.vehicleService.get(this.navParams.get('id')).do(vehicle => {this.vehicle = vehicle; console.log(this.vehicle)});
  }

  refreshVehicleStatus(refresher) {
    this.loadVehicleStatus().subscribe(
      null,
      err => err.status != 401 && refresher.cancel(),
      () => refresher.complete()
    );
  }

  showRun({ id }: User): void {
    this.navCtrl.push(ProfilPage, { id });
  }

}
