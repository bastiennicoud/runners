import { Component } from '@angular/core'
import {
  NavController,
  LoadingController,
  ModalController,
} from 'ionic-angular'

import { RunService, Run } from '../../services/run.service'
import { RunPage } from '../run/run'
import { RunStatusEnum } from '../../enums/run-status.enum'
import { InternetStatusProvider } from '../../providers/internet-status/internet-status'

import { filters, filterEngine } from '../../utils/filterengine/filterEngine'
import { SettingsPage } from '../settings/settings'

@Component({
  selector: 'page-runs',
  templateUrl: 'runs.html',
})
export class RunsPage {
  runs: Run[] = []
  RunStatusEnum = RunStatusEnum
  filters: any = filters
  oldmode: string = 's'

  constructor(
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private runService: RunService,
    private InternetStatus: InternetStatusProvider,
    private modalCtrl: ModalController
  ) {}

  ionViewWillEnter() {
    this.InternetStatus.checkConnection()

    const loader = this.loadingCtrl.create({ content: 'Chargement ...' })
    loader.present().then(() => {
      this.loadRuns().subscribe(
        () => loader.dismiss().catch(err => console.log(err)), //TODO temporary dismiss
        err =>
          err.status != 401 && loader.dismiss().catch(err => console.log(err))
      )
    })
  }

  onFilterClick(filterName: string) {
    this.filters[filterName].toggle()
    //this.refreshRuns({ cancel:()=>null, complete: () => null })
  }

  ionViewWillLeave() {
    this.InternetStatus.stopCheckingConnection()
  }

  openModal() {
    var filtersModal = this.modalCtrl.create('FiltersPage')

    filtersModal.onDidDismiss(() => {
      this.loadRuns().subscribe()
    })

    filtersModal.present()
  }

  /**
   * Get the run list filtered
   * @returns {any[]}
   */
  getRuns(){
    return filterEngine.filterList(this.runs)
  }

  /**
   * Load all the runs
   *
   * @returns
   *
   * @memberOf RunsPage
   */
  loadRuns() {
    return this.runService.all().do(runs => (this.runs = runs))
  }

  /**
   * Function to refresh when pulled
   *
   * @param {any} refresher
   *
   * @memberOf RunsPage
   */
  refreshRuns(refresher) {
    this.loadRuns().subscribe(
      null,
      err => err.status != 401 && refresher.cancel().catch(err => console.log(err)),
      () => refresher.complete()
    )
  }

  /**
   * Show the detail of the run
   *
   * @param {Run} { id }
   *
   * @memberOf RunsPage
   */
  showRun({ id }: Run): void {
    this.navCtrl.push(RunPage, { id })
  }

  openSettings() {
    this.navCtrl.push(SettingsPage)
  }

  nbUrgentRuns() {
    return this.runs.filter(a => {
      return a.problem
    }).length
  }
}
