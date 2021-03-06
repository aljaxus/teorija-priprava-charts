import Vue from 'vue'
import App from './App.vue'
import VueApexCharts from 'vue-apexcharts'
import './registerServiceWorker'

Vue.config.productionTip = false
Vue.component('apexchart', VueApexCharts)

new Vue({
  render: h => h(App),
}).$mount('#app')
