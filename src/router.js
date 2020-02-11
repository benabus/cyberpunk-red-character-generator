import Vue from "vue";
import Router from "vue-router";
import CharGen from "./views/CharGen";
import LifePath from "./views/2020Lifepath";

Vue.use(Router);

export default new Router({
  mode: "hash",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/lifepath",
      name: "lifepath",
      component: LifePath
    },
    {
      path: "/:base64?",
      name: "home-base64",
      component: CharGen
    },
  ]
});
