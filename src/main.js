import { createApp,configureCompat  } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import 'bootswatch/dist/zephyr/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
createApp(App).use(store).use(router).component('v-select', vSelect).mount('#app')
