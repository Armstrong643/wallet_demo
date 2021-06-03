import Vue from "vue";
import App from "./App.vue";
import { cryptoWaitReady } from "@polkadot/util-crypto";

Vue.config.productionTip = false;

(async () => {
  await cryptoWaitReady();
})();

new Vue({
  render: (h) => h(App),
}).$mount("#app");
