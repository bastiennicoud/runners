import { Injectable, Pipe } from '@angular/core';

import { Run } from '../models/run';

@Pipe({
  name: 'groupRuns'
})
@Injectable()
export class GroupRunsPipe {

  transform(runs: Run[]): any[] {
    const groupedRuns = runs.reduce((prev: any[], cur: Run) => {
      const key = `${cur.beginAt.getFullYear()}-${cur.beginAt.getMonth()}-${cur.beginAt.getDate()}`;
      if (!prev[key]) prev[key] = { date: cur.beginAt, runs: [cur] };
      else prev[key].runs.push(cur);
      return prev;
    }, []);
    return Object.keys(groupedRuns).map(key => {
      const { date, runs } = groupedRuns[key];
      return { date, runs };
    });
  }

}
