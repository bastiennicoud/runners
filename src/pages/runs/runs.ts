import { Component } from '@angular/core'
import { NavController, LoadingController } from 'ionic-angular'

import { RunService, Run } from '../../services/run.service'
import { RunPage } from '../run/run'
import { RunStatusEnum } from '../../enums/run-status.enum'

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
    private runService: RunService
  ) {}

  ionViewWillEnter() {
    const loader = this.loadingCtrl.create({ content: 'Chargement ...' })
    loader.present()

    this.loadRuns().subscribe(
      null,
      err => err.status != 401 && loader.dismiss(),
      () => loader.dismiss()
    )
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
