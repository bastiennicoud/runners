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
import {User} from "../../models/user";
import {AuthStorage} from "../../storages/auth.storage";
import {prefixNumber as pN} from "../../utils/helper";
import * as moment from 'moment';
@Component({
  selector: 'page-runs',
  templateUrl: 'runs.html',
})
export class RunsPage {
  runs: Run[] = []
  RunStatusEnum = RunStatusEnum
  filters: any = filters
  public user : User;

  oldmode: string = 's'

  constructor(
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private runService: RunService,
    private InternetStatus: InternetStatusProvider,
    private modalCtrl: ModalController,
    private authStorage : AuthStorage
  ) {}

  ionViewWillEnter() {
    this.user = this.authStorage.user

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
  headerFn(record, recordIndex, records){

    if(recordIndex >= records.length)
      return null
    const next = records[recordIndex+1]
    if(!record.beginAt || !next || !next.beginAt)
      return null

    const x = r => `${r.beginAt.getFullYear()}-${pN(r.beginAt.getMonth() + 1)}-${pN(r.beginAt.getDay())}`
    const currentRecordDate = x(record)
    const nextRecordDate = x(next)
    console.log(currentRecordDate)
    console.log(nextRecordDate)
    if(recordIndex == 0)
      return currentRecordDate
    console.log(moment(currentRecordDate).isBefore(nextRecordDate))
    if(moment(currentRecordDate).isBefore(nextRecordDate))
      return currentRecordDate//.strftime("EEEE d MMMM y")
    return null;

  }
  ionViewWillLeave() {
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
  groupRuns(runs:Run[]){
    const groupedRuns = runs.reduce((prev: any[], cur: Run) => {
      const key = `${cur.beginAt.getFullYear()}-${pN(
        cur.beginAt.getMonth() + 1
      )}-${pN(cur.beginAt.getDay())}`
      if (!prev[key]) prev[key] = { date: cur.beginAt, runs: [cur] }
      else prev[key].runs.push(cur)
      return prev
    }, [])
    return Object.keys(groupedRuns)
      .sort()
      .reverse()
      .map(key => {
        const { date, runs } = groupedRuns[key]
        return { runs }
      })

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
      err => err.status != 401 && (refresher.cancel()) ? refresher.cancel().catch(err => console.log(err)): true,
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
