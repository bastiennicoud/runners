import { Injectable, Pipe } from '@angular/core'

import { Run } from '../models/run'
import { AuthStorage } from '../storages/auth.storage'

import { filterEngine, filters } from '../utils/filterengine/filterEngine'
import { filter } from 'rxjs/operator/filter'

@Pipe({
  name: 'filterRuns',
})
@Injectable()
export class FilterRunsPipe {
  constructor(private authStorage: AuthStorage) {
    filters.mine.externalData = this.authStorage.user
    filters.hideCompleted.disable()
    filters.mine.disable()
    filters.urgent.disable()
    console.log(filters)
  }

  transform(runs: Run[]): Run[] {
    return filterEngine.filterList(runs)
  }
}
