import FilterEngine from './engine'
import Filter from './filter'

import { RunStatusEnum } from '../../enums/run-status.enum'

import moment from 'moment'
import { filter } from 'ionic-native/node_modules/rxjs/operator/filter'

export interface FilterObject {
  [key: string]: Filter
}

export const filters: FilterObject = {
  organizing: new Filter(a => /organizing-?.+/.test(a.status), 'Not ready'),
  hideCompleted: new Filter(a => a.completed, 'Completed'),
  mine: new Filter(function(a) {
    const user = this.externalData
    return user.belongsToRun(a)
  }, 'Mine'),
  urgent: new Filter(a => a.problem, 'Urgent'),
  today: new Filter(
    a =>
      moment(a.beginAt).isBetween(
        moment().subtract(12, 'h'),
        moment().add(24, 'h')
      ),
    'Today'
  ),
}

export const filterEngine = new FilterEngine()

filterEngine.filters = Object.keys(filters).map(key => filters[key])
