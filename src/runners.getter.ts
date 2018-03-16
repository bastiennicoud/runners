import { api, refresh } from './runners.config'

const API_KEY = 'API_URL'
export const APP_VERSION = 'DEMO-RC-1.0.0'
let api_cache = null

export const getApi = () => {
  if (api_cache === null) api_cache = localStorage.getItem(API_KEY) || api
  return api_cache
}
export const setApi = api => {
  api_cache = api
  localStorage.setItem(API_KEY, api)
}

let refresh_time = null
const REFRESH_TIME_KEY="REFRESHER/TIMEOUT"
export const getRefreshTimeout = () => {
  if(refresh_time == null) refresh_time = localStorage.getItem(REFRESH_TIME_KEY) || refresh
  return refresh_time
}
export const setRefreshTimeout = (t) => {
  refresh_time = t
  localStorage.setItem(REFRESH_TIME_KEY, t)
}
