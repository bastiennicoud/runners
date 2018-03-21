import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ViewController} from 'ionic-angular';
import {VehicleService} from "../../services/vehicle.service";
import {Vehicle} from "../../models/vehicle";
import {Comment} from "../../models/comment";

/**
 * Generated class for the CommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {
  public data : string;
  public model : Vehicle;
  public comment : Comment
  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams, private vehicleSerice : VehicleService, private loadingCtrl : LoadingController) {
  }
  ionViewWillEnter(){
    const loader = this.loadingCtrl.create({ content: 'Chargement ...' })
    loader.present().then(() => {
      this.loadVehicle().subscribe(
        null,
        err => err.status != 401 && loader.dismiss(),
        () => loader.dismiss()
      )
    })
  }
  loadVehicle(){
    return this.vehicleSerice.get(this.navParams.get("id")).do(c => this.model = c)
  }
  ionViewDidLoad() {

  }
  saveComment(){
    this.vehicleSerice.addComment(this.model.id, this.data).subscribe((comment : Comment) => this.comment = comment,()=>this.viewCtrl.dismiss(), () => this.viewCtrl.dismiss(this.comment))
  }

}
