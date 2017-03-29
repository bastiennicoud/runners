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

/**
 * Load the data linked to the vehicle
 *
 * @returns
 *
 * @memberOf VehiclePage
 */
  loadVehicleStatus() {
    return this.vehicleService.get(this.navParams.get('id')).do(vehicle => {
      this.vehicle = vehicle;
      this.vehicle.user = User.build({
        id: '140a24be-762e-4b83-b43a-1b6314d9bd3c',
        firstname:'Laura',
        lastname: 'Remy'
      })
      console.log(this.vehicle);
    });
  }

/**
 * Pull to refresh method to actualize the data
 *
 * @param {any} refresher
 *
 * @memberOf VehiclePage
 */
  refreshVehicleStatus(refresher) {
    this.loadVehicleStatus().subscribe(
      null,
      err => err.status != 401 && refresher.cancel(),
      () => refresher.complete()
    );
  }

/**
 * On click on the user, show the profil page
 *
 * @param {User} { id }
 *
 * @memberOf VehiclePage
 */
  showUser({ id }: User): void {
    this.navCtrl.push(ProfilPage,{ id });
  }

}
