import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import colorSchemeSettings from "./color-scheme";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  colorSchemeSettings,
  render: h => h(App),
}).$mount("#app");
