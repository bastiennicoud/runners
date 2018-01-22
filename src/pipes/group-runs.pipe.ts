import { Injectable, Pipe } from '@angular/core'

import { Run } from '../models/run'
import { prefixNumber as pN } from '../utils/helper'

@Pipe({
  name: 'groupRuns',
})
@Injectable()
export class GroupRunsPipe {
  transform(runs: Run[]): any[] {
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
        return { date, runs }
      })
  }
}
