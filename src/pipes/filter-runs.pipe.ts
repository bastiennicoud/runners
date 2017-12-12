import { Injectable, Pipe } from '@angular/core'

import { Run } from '../models/run'
import { AuthStorage } from '../storages/auth.storage'

import { filterEngine, filters } from '../utils/filterengine/filterEngine'

@Pipe({
  name: 'filterRuns',
})
@Injectable()
export class FilterRunsPipe {
  constructor(private authStorage: AuthStorage) {}

  transform(runs: Run[]): Run[] {
    return filterEngine.filterList(runs)
  }
}
