import { Injectable, Pipe } from '@angular/core'

import { Run } from '../models/run'
import { AuthStorage } from '../storages/auth.storage'

import { filterEngine, filters } from '../utils/filterengine/filterEngine'

@Pipe({
  name: 'filterRuns',
})
@Injectable()
export class FilterRunsPipe {
  constructor(private authStorage: AuthStorage) {
    filters.hideCompleted.enable()
    filters.hideNotReady.enable()
  }

  transform(runs: Run[]): Run[] {
    console.log(runs)
    return filterEngine.filterList(runs)
  }
}
