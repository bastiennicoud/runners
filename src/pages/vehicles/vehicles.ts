import { Component } from '@angular/core'
import { NavController, LoadingController } from 'ionic-angular'
import { VehiclePage } from '../vehicle/vehicle'

import { VehicleService, Vehicle } from '../../services/vehicle.service'
import { InternetStatusProvider } from '../../providers/internet-status/internet-status'

/**
 * This class lists all vehicles available or in use.
 *
 * @export
 * @class VehiclesPage
 */
@Component({
  selector: 'page-vehicles',
  templateUrl: 'vehicles.html',
})
export class VehiclesPage {
  vehicles: Vehicle[] = []

  constructor(
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private vehicleService: VehicleService,
    private InternetStatus: InternetStatusProvider
  ) {}

  ionViewWillEnter() {
    const loader = this.loadingCtrl.create({ content: 'Chargement ...' })
    loader.present().then(() => {
      this.loadVehicles().subscribe(
        null,
        err => err.status != 401 && loader.dismiss(),
        () => loader.dismiss()
      )
    })
  }

  ionViewWillLeave() {}

  /**
   * Load the datas of the vehicle
   *
   * @returns
   *
   * @memberOf VehiclesPage
   */
  loadVehicles() {
    return this.vehicleService.all().do(vehicles => (this.vehicles = vehicles))
  }

  refreshVehicleStatus(refresher) {
    this.loadVehicles().subscribe(
      null,
      err => err.status != 401 && refresher.cancel(),
      () => refresher.complete()
    )
  }

  /**
   * Show the page detailing the vehicle
   *
   * @param {Vehicle} v
   *
   * @memberOf VehiclesPage
   */
  showVehicle(v: Vehicle): void {
    this.navCtrl.push(VehiclePage, { id: v.id })
  }
}
