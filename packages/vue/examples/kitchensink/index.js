import Vue from "vue";
import Vuex from "vuex";
import VueColorSchemePlugin from "@color-scheme/vue";

import App from "./App.vue";

Vue.use(Vuex);
Vue.use(VueColorSchemePlugin);

new Vue({
  el: "#app",
  store: new Vuex.Store(),
  render: createElement => createElement(App),
});
