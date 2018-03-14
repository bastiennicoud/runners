import FilterEngine from './engine'
import Filter from './filter'

import { RunStatusEnum } from '../../enums/run-status.enum'

import moment from 'moment'

export interface FilterObject {
  [key: string]: Filter
}

export const filters: FilterObject = {
  /**
   * get only not ready runs
   */
  organizing: new Filter(a => /organizing-?.+/.test(a.status), 'Not ready'),
  /**
   * get only not completed runs
   */
  hideCompleted: new Filter(a => a.completed, 'Completed'),
  /**
   * get only my runs
   */
  mine: new Filter(function(a) {
    const user = this.externalData
    return user.belongsToRun(a)
  }, 'Mine'),
  /**
   * get only urgent runs
   */
  urgent: new Filter(a => a.problem, 'Urgent'),
  /**
   * get only runs between the next 24h and last 12h
   */
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
