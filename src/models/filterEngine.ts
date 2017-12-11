import FilterEngine from '../utils/filterengine/engine'
import Filter from '../utils/filterengine/filter'

interface FilterObject {
  [key: string]: Filter
}

export const filters: FilterObject = {
  all: new Filter(a => true),
  finished: new Filter(a => a.isFinished),
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

const filterEngine = new FilterEngine()

filterEngine.filters = Object.keys(filters).map(key => filters[key])

export default filterEngine
