import Filter from './filter'
/**
 * Engine that store filters. It is used to combine some filters
 *
 * @export
 * @see Filter
 * @class FilterEngine
 */
export default class FilterEngine {
  /**
   * List of filters
   */
  public filters: Filter[] = []
  /**
   * list of filters that are enabled
   *
   * @readonly
   * @type {Filter[]}
   * @memberof FilterEngine
   */
  public get enabledFilters(): Filter[] {
    return this.filters.filter(a => a.isEnabled)
  }
  /**
   * Filter a list with configured filters
   * @param list
   * @returns {any[]} list filtered
   */
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
