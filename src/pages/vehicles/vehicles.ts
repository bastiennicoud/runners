import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { VehiclePage } from '../vehicle/vehicle';

import { VehicleService, VehicleStatus, Vehicle } from '../../services/vehicle.service';

@Component({
  selector: 'page-vehicles',
  templateUrl: 'vehicles.html'
})
export class VehiclesPage {

  vehicleStatus: VehicleStatus[] = [];

  constructor(private navCtrl: NavController, private loadingCtrl: LoadingController, private vehicleService: VehicleService) {
    const loader = this.loadingCtrl.create({ content: 'Chargement ...'});
    loader.present();
    this.loadVehicleStatus().subscribe(
      null,
      err => err.status != 401 && loader.dismiss(),
      () => loader.dismiss()
    );
  }

  loadVehicleStatus() {
    return this.vehicleService.status().do(vehicleStatus => this.vehicleStatus = vehicleStatus);
  }

  refreshVehicleStatus(refresher) {
    this.loadVehicleStatus().subscribe(
      null,
      err => err.status != 401 && refresher.cancel(),
      () => refresher.complete()
    );
  }

  showVehicle(v: VehicleStatus): void {
    this.navCtrl.push(VehiclePage, { id: v.vehicle.id });
  }

}
