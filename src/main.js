import '@/assets/styles/imports.sass';
import Vue from 'vue'
import App from './App.vue'

import 'slick-carousel/slick/slick.js'
import 'slick-carousel/slick/slick.css'
import {currency} from "@/filters/currency";
Vue.filter('currency', currency)

Vue.config.productionTip = false
new Vue({
  data: {
    
  },
  render: h => h(App),
}).$mount('#app')
