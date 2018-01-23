import { api } from './runners.config'

const API_KEY = 'API_URL'
let api_cache = null

export const getApi = () => {
  if (api_cache === null) api_cache = localStorage.getItem(API_KEY) || api
  return api_cache
}
export const setApi = api => {
  api_cache = api
  localStorage.setItem(API_KEY, api)
}
