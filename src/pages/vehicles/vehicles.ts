import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { VehicleService, VehicleStatus, Vehicle, User } from '../../services/vehicle.service';

@Component({
  selector: 'page-vehicles',
  templateUrl: 'vehicles.html'
})
export class VehiclesPage implements OnInit {

  vehicles: VehicleStatus[] = null;

  constructor(public navCtrl: NavController, public vehicleService: VehicleService) {

  }

  openPage(vehicle) {
    console.log("my vehicle");
  }

  getCardStyle(vehicle: VehicleStatus) {
    if (vehicle.user != null) {
      return "card";
    } else {
      return "card free";
    }

  }

  getBorderStyle(vehicle: VehicleStatus) {
    if (vehicle.user != null) {
      return "border-left grey"
    } else {
      return "border-left green"
    }

  }

  ngOnInit(): void {
    this.vehicles = [];
    this.vehicleService.status().subscribe((status) => {
      this.vehicles = status;
      console.log(status);
    }, (error) => {
      console.error("Runs : ", error);
    });
  }
}

