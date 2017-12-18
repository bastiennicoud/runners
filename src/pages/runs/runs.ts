import { Component } from '@angular/core'
import {NavController, LoadingController, ModalController} from 'ionic-angular'

import { RunService, Run } from '../../services/run.service'
import { RunPage } from '../run/run'
import { FilterByEnum } from '../../enums/filter-by.enum'
import { RunStatusEnum } from '../../enums/run-status.enum'

@Component({
  selector: 'page-runs',
  templateUrl: 'runs.html',
})
export class RunsPage {
  runs: Run[] = []
  FilterByEnum = FilterByEnum
  RunStatusEnum = RunStatusEnum
  filteredBy: FilterByEnum = FilterByEnum.current

  constructor(
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private runService: RunService,
    private modalController: ModalController
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
    const yourModal = this.modalController.create(RunPage, { id }, {
      showBackdrop: false,
      enableBackdropDismiss: false,
      enterAnimation: 'modal-scale-up-enter',
      leaveAnimation: 'modal-scale-up-leave'
    });
    yourModal.present();
    // this.navCtrl.push(RunPage, { id })
  }
}
