import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Run } from '../../models/run';

/*
  Generated class for the Run page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-run',
  templateUrl: 'run.html'
})
export class RunPage {


  run: Run = null;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.run = navParams.data;
  }

  ionViewDidLoad() {
    console.log('Hello RunPage Page');
  }

  showvehicles(){
    alert("Limousine \n Vito \n Vito \n Vito");
  }

}
