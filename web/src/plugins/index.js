/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify'
import apiForum from './apiForum'
import apiProfile from './apiProfile'
import apiConfigs from './apiConfigs'
import apiUsers from './apiUsers'
import apiStatistics from './apiStatistics'
import pinia from '@/stores'
import router from '@/router'
import apiAuth from '@/plugins/apiAuth'


export function registerPlugins (app) {
  app
    .use(vuetify)
    //add api users
    .use(apiUsers, {
      baseURL: 'https://localhost:4001/'
    })
    .use(apiProfile, {
      baseURL: 'https://localhost:4002/'
    })
    .use(apiForum,  {
    baseURL: 'https://localhost:4003/'
    })
    .use(apiConfigs, {
      baseURL: 'https://localhost:4006/'
    })
    .use(apiAuth, {
      baseURL: 'https://localhost:4007/'
    })
    .use(apiStatistics, {
      baseURL: 'https://localhost:4008/'
    })
    .use(router)
    .use(pinia)

}
