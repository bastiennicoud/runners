import Filter from './filter'

export default class FilterEngine {
  public filters: Filter[] = []
  public get enabledFilters(): Filter[] {
    return this.filters.filter(a => a.isEnabled)
  }
  public filterList(list: any[]): any[] {
    const filtered = []
    for (let item of list) {
      let ok = true
      for (let filter of this.enabledFilters) {
        if (filter.test(item) === false) {
          ok = false
          break
        }
      }
      if (ok === true) filtered.push(item)
    }
    return filtered
  }
}
