import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RunService } from '../../services/run.service';
import { Run } from '../../models/run';
import { RunPage } from '../run/run';

@Component({
  selector: 'page-runs',
  templateUrl: 'runs.html'
})
export class RunsPage implements OnInit {

  runs: Run[] = [];

  constructor(public navCtrl: NavController, public runServices: RunService) {
  }

  ionViewWillEnter() {
    this.ngOnInit();
  }

  ionViewWillLeave() {
    this.runs = [];
  }

  ngOnInit(): void {
    if (this.runs.length == 0) {
      this.runServices.all().subscribe((runs) => {
        this.runs = runs;
      }, (error) => {
        console.error("Runs : ", error);
      });
    }
  }

  openPage(run) {
    this.navCtrl.push(RunPage, run);
  }
  

}

