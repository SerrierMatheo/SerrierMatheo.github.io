/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBold, faItalic, faUnderline, faListUl, faAlignLeft, faAlignCenter, faAlignRight, faTint } from '@fortawesome/free-solid-svg-icons'

library.add(faBold, faItalic, faUnderline, faListUl, faAlignLeft, faAlignCenter, faAlignRight, faTint)

// Composables
import { createApp } from 'vue'

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)

registerPlugins(app)

app.mount('#app')
