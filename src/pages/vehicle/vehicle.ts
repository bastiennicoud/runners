import { Component } from '@angular/core'
import { Vehicle, VehicleService } from '../../services/vehicle.service'
import { ProfilPage } from '../../pages/profil/profil'
import { User } from '../../models/user'
import { NavController, NavParams, LoadingController } from 'ionic-angular'
import { VehicleStatusEnum } from '../../enums/vehicle-status.enum'
import { InternetStatusProvider } from '../../providers/internet-status/internet-status'
import {Comment} from "../../models/comment";

/**
 * This class displays the profile of a vehicle
 *
 * @export
 * @class VehiclePage
 */
@Component({
  selector: 'page-vehicle',
  templateUrl: 'vehicle.html',
})
export class VehiclePage {
  vehicle: Vehicle = Vehicle.build(null)
  VehicleStatusEnum = VehicleStatusEnum

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private vehicleService: VehicleService,
    private InternetStatus: InternetStatusProvider
  ) {}

  ionViewWillEnter() {
    const loader = this.loadingCtrl.create({ content: 'Chargement ...' })
    loader.present().then(() => {
      this.loadVehicleStatus().subscribe(
        null,
        err => err.status != 401 && loader.dismiss(),
        () => loader.dismiss()
      )
    })
  }

  ionViewWillLeave() {}

  /**
   * Load the data linked to the vehicle
   *
   * @returns
   *
   * @memberOf VehiclePage
   */
  loadVehicleStatus() {
    return (
      this.vehicleService
        .get(this.navParams.get('id'))
        // TODO: fake data you have to replace them by real one
        .map(vehicle =>
          Object.assign(vehicle, {
            user: User.build({
              id: '140a24be-762e-4b83-b43a-1b6314d9bd3c',
              firstname: 'Laura',
              lastname: 'Remy',
            }),
            comments: [
              Comment.build({
                createdAt: new Date(),
                message:
                  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti architecto qui laboriosam. Ipsa dolorum saepe nihil enim ex, eius soluta esse animi, illum sit nulla iste ea consequatur, assumenda provident?',
                author: User.build({
                  id: '140a24be-762e-4b83-b43a-1b6314d9bd3c',
                  firstname: 'Laura',
                  lastname: 'Remy',
                }),
              }),
              Comment.build({
                createdAt: new Date(),
                message:
                  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti architecto qui laboriosam. Ipsa dolorum saepe nihil enim ex, eius soluta esse animi, illum sit nulla iste ea consequatur, assumenda provident?',
                author: User.build({
                  id: '140a24be-762e-4b83-b43a-1b6314d9bd3c',
                  firstname: 'Laura',
                  lastname: 'Remy',
                }),
              }),
            ],
          })
        )
        .do(vehicle => (this.vehicle = vehicle))
    )
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
    )
  }

  /**
   * On click on the user, show the profil page
   *
   * @param {User} { id }
   *
   * @memberOf VehiclePage
   */
  showUser({ id }: User): void {
    this.navCtrl.push(ProfilPage, { id })
  }
}
