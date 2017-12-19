import FilterEngine from './engine'
import Filter from './filter'

export interface FilterObject {
  [key: string]: Filter
}

export const filters: FilterObject = {
  all: new Filter(a => true, 'All'),
  mine: new Filter(a => a.isFinished, 'Mine'),
}

filters.all.onEnable = () => {
  for (let key in filters) {
    if (key === 'all') continue
    filters[key].enable()
  }
}
filters.all.onDisable = () => {
  for (let key in filters) {
    if (key === 'all') continue
    filters[key].disable()
  }
}

export const filterEngine = new FilterEngine()

filterEngine.filters = Object.keys(filters).map(key => filters[key])
