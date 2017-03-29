import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import { RunService, Run } from '../../services/run.service';
import { RunPage } from '../run/run';
import { FilterByEnum } from '../../enums/filter-by.enum';
import { RunStatusEnum } from '../../enums/run-status.enum';

@Component({
  selector: 'page-runs',
  templateUrl: 'runs.html',
})
export class RunsPage {

  runs: Run[] = [];
  FilterByEnum = FilterByEnum;
  RunStatusEnum = RunStatusEnum;
  filteredBy: FilterByEnum = FilterByEnum.current;

  constructor(private navCtrl: NavController, private loadingCtrl: LoadingController, private runService: RunService) {
    const loader = this.loadingCtrl.create({ content: 'Chargement ...' });
    loader.present();
    this.loadRuns().subscribe(
      null,
      err => err.status != 401 && loader.dismiss(),
      () => loader.dismiss()
    );
  }

  loadRuns() {
    return this.runService.all().do(runs => this.runs = runs);
  }

  refreshRuns(refresher) {
    this.loadRuns().subscribe(
      null,
      err => err.status != 401 && refresher.cancel(),
      () => refresher.complete()
    );
  }

  showRun({ id }: Run): void {
    this.navCtrl.push(RunPage, { id });
  }

}
