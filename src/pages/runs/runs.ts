import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RunService } from '../../services/run.service';
import { AuthService } from '../../services/auth.service';
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
    if(AuthService.isAuthenticated()) this.loadRuns();
  }

  ionViewWillLeave() {
    this.runs = [];
  }

  ngOnInit(): void {
    // this.loadRuns();
  }

  loadRuns(): void {
    this.runServices.all().subscribe((runs) => {
      this.runs = runs;
    }, (error) => {
      console.error("Runs : ", error);
    });
  }

  openPage(run) {
    this.navCtrl.push(RunPage, run);
  }


}

