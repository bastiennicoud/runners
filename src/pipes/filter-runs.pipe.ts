import { Injectable, Pipe } from '@angular/core';

import { Run } from '../models/run';
import { AuthStorage } from '../storages/auth.storage';
import { FilterByEnum } from '../enums/filter-by.enum';

@Pipe({
  name: 'filterRuns'
})
@Injectable()
export class FilterRunsPipe {

  constructor(private authStorage: AuthStorage) {}

  private onlyCurrent(run: Run): boolean {
    return !run.completed;
  }

  private onlyMine(run: Run): boolean {
    return this.authStorage.user.belongsToRun(run);
  }

  private onlyOld(run: Run): boolean {
    return run.completed;
  }

  private methods: any = {
    [FilterByEnum.current]: this.onlyCurrent.bind(this),
    [FilterByEnum.mine]: this.onlyMine.bind(this),
    [FilterByEnum.old]: this.onlyOld.bind(this),
    default: () => true,
  };

  transform(runs: Run[], by: FilterByEnum): Run[] {
    return runs.filter(this.methods[by] || this.methods.default);
  }

}
