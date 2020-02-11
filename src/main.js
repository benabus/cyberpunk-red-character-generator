import Vue from "vue";
import VModal from 'vue-js-modal'
import App from "./App.vue";
import router from "./router";
import store from "./store";
// App custom styles
import "./assets/sass/app.scss";

Vue.config.productionTip = false;

Vue.use(VModal);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
