import { Component } from '@angular/core'
import { NavController, LoadingController } from 'ionic-angular'

import { RunService, Run } from '../../services/run.service'
import { RunPage } from '../run/run'
import { RunStatusEnum } from '../../enums/run-status.enum'
import { InternetStatusProvider } from '../../providers/internet-status/internet-status'

import { filters } from '../../utils/filterengine/filterEngine'

@Component({
  selector: 'page-runs',
  templateUrl: 'runs.html',
})
export class RunsPage {
  runs: Run[] = []
  RunStatusEnum = RunStatusEnum
  filters: any = filters
  oldmode: string =  's'

  constructor(
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private runService: RunService,
    private InternetStatus: InternetStatusProvider
  ) {}

  ionViewWillEnter() {
    this.InternetStatus.checkConnection()

    const loader = this.loadingCtrl.create({ content: 'Chargement ...' })
    loader.present()

    this.loadRuns().subscribe(
      null,
      err => err.status != 401 && loader.dismiss(),
      () => loader.dismiss()
    )
  }

  ionViewWillLeave() {
    this.InternetStatus.stopCheckingConnection()
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
      err => err.status != 401 && refresher.cancel(),
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
}
