import { Component } from '@angular/core'
import { NavController, LoadingController } from 'ionic-angular'
import { VehiclePage } from '../vehicle/vehicle'

import { VehicleService, VehicleStatus } from '../../services/vehicle.service'
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
  vehicleStatus: VehicleStatus[] = []

  constructor(
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private vehicleService: VehicleService,
    private InternetStatus: InternetStatusProvider
  ) {}

  ionViewWillEnter() {
    this.InternetStatus.checkConnection()

    const loader = this.loadingCtrl.create({ content: 'Chargement ...' })
    loader.present().then(()=>{
      this.loadVehicleStatus().subscribe(
        null,
        err => err.status != 401 && loader.dismiss(),
        () => loader.dismiss()
      )
    })

  }

  ionViewWillLeave() {
    this.InternetStatus.stopCheckingConnection()
  }

  /**
   * Load the datas of the vehicle
   *
   * @returns
   *
   * @memberOf VehiclesPage
   */
  loadVehicleStatus() {
    return this.vehicleService
      .status()
      .do(vehicleStatus => (this.vehicleStatus = vehicleStatus))
  }

  refreshVehicleStatus(refresher) {
    this.loadVehicleStatus().subscribe(
      null,
      err => err.status != 401 && refresher.cancel(),
      () => refresher.complete()
    )
  }

  /**
   * Show the page detailing the vehicle
   *
   * @param {VehicleStatus} v
   *
   * @memberOf VehiclesPage
   */
  showVehicle(v: VehicleStatus): void {
    this.navCtrl.push(VehiclePage, { id: v.vehicle.id })
  }
}
