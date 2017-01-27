import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnInit{


  constructor(public navCtrl: NavController) {  }

  ngOnInit(): void {
    console.log("Home page load !");
  }

}
