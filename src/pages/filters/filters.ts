import { Component } from '@angular/core'
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController,
} from 'ionic-angular'

import { filters, FilterObject } from '../../utils/filterengine/filterEngine'

@IonicPage()
@Component({
  selector: 'page-filters',
  templateUrl: 'filters.html',
})
export class FiltersPage {
  filters: FilterObject = filters
  filterkeys: string[] = Object.keys(this.filters)
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController
  ) {}

  close() {
    this.viewCtrl.dismiss()
  }

  onFilterClick(filterName: string) {
    this.filters[filterName].toggle()
  }
}
