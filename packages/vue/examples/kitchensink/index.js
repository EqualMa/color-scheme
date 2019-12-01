import Vue from 'vue';
import Vuex from 'vuex';
import VueColorSchemePlugin from '@/vue-color-scheme';

import App from './App.vue';

Vue.use(Vuex);
Vue.use(VueColorSchemePlugin);

new Vue({
  el: '#app',
  store: new Vuex.Store(),
  colorSchemeSettings: new VueColorSchemePlugin(),
  render: createElement => createElement(App)
});
