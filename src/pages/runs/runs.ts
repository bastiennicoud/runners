import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RunService } from '../../services/run.service';
import { Run } from '../../models/run';
import { RunPage } from '../run/run';

@Component({
  selector: 'page-runs',
  templateUrl: 'runs.html'
})
export class RunsPage implements OnInit{

  runs:Run[] = null;

  constructor(public navCtrl: NavController, public runServices: RunService) {
  }

  openPage(run){
    this.navCtrl.push(RunPage, run);
  }

  ngOnInit(): void {
    this.runServices.all().subscribe((runs) =>{
      console.log(runs);
      this.runs = runs;
    }, (error) => {
        console.error("Runs : ", error);
    });
  }

}

