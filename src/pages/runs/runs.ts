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
import { User } from '../../models/user'
import { AuthStorage } from '../../storages/auth.storage'
import * as moment from 'moment'
import { prefixNumber as pN } from '../../utils/helper'

import debug from 'debug'

@Component({
  selector: 'page-runs',
  templateUrl: 'runs.html',
})
export class RunsPage {
  runs: Run[] = []
  RunStatusEnum = RunStatusEnum
  filters: any = filters
  public user: User

  oldmode: string = 's'

  constructor(
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private runService: RunService,
    private InternetStatus: InternetStatusProvider,
    private modalCtrl: ModalController,
    private authStorage: AuthStorage
  ) {}

  ionViewWillEnter() {
    this.user = this.authStorage.user

    const loader = this.loadingCtrl.create({ content: 'Chargement ...' })
    loader.present().then(() => {
      this.loadRuns().subscribe(
        () => loader.dismiss().catch(err => console.error(err)), //TODO temporary dismiss
        err =>
          err.status != 401 && loader.dismiss().catch(err => console.error(err))
      )
    })
  }

  onFilterClick(filterName: string) {
    this.filters[filterName].toggle()
    //this.refreshRuns({ cancel:()=>null, complete: () => null })
  }

  ionViewWillLeave() {}

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
  getRuns() {
    const flatten = arr =>
      arr.reduce(function(flat, toFlatten) {
        return flat.concat(
          Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten
        )
      }, [])
    const runs = filterEngine.filterList(this.runs)
    
    return flatten(this.groupRuns(runs).map(g => g.runs))
  }

  groupRuns(runs: Run[]) {
    const groupedRuns = runs.reduce((prev: any[], cur: Run) => {
      const key = `${cur.beginAt.getFullYear()}-${pN(
        cur.beginAt.getMonth() + 1
      )}-${pN(cur.beginAt.getDate())}`
      if (!prev[key]) prev[key] = { date: cur.beginAt, runs: [cur] }
      else prev[key].runs.push(cur)
      return prev
    }, [])
    return Object.keys(groupedRuns)
      .sort()
      .reverse()
      .map(key => {
        const { date, runs } = groupedRuns[key]
        return { date, runs }
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
      err =>
        err.status != 401 && refresher.cancel()
          ? refresher.cancel().catch(err => console.error(err))
          : true,
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
  headerFn(record, recordIndex, records) {
    var previous
    if (recordIndex <= 0) previous = null
    else previous = records[recordIndex - 1]

    const x = r =>
      `${r.beginAt.getFullYear()}-${pN(r.beginAt.getMonth() + 1)}-${pN(
        r.beginAt.getDate()
      )}`
    const format = d => moment(d).format('dddd DD MMM YYYY')
    const currentRecordDate = x(record)

    if (previous === null) return format(record.beginAt)

    if (!record.beginAt || !previous.beginAt) return null

    const previousRecordDate = x(previous)
    if (moment(currentRecordDate).isBefore(previousRecordDate))
      return format(record.beginAt) //.strftime("EEEE d MMMM y")
    return null
  }
}
