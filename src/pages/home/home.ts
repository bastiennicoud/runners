import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RunService } from '../../services/run.services';
import { Run } from '../../models/run';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnInit{

  runs:Run[] = null;

  constructor(public navCtrl: NavController, public runServices: RunService) {
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
