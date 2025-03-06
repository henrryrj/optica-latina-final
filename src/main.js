import { createApp, configureCompat } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vSelect from 'vue-select'
import Toaster from "@meforma/vue-toaster";
import 'vue-select/dist/vue-select.css'
import 'bootswatch/dist/zephyr/bootstrap.css'
import 'bootstrap';
createApp(App).use(store).use(router).component('v-select', vSelect).use(Toaster, {
    dismissible: true,
    position: "top-right",
}).mount('#app')
