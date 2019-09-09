import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            name: "home",
            component: () =>
                import(/* webpackChunkName: "home" */ "./views/Home.vue")
        },
        {
            path: "/:base64",
            name: "home-base64",
            component: () =>
                import(/* webpackChunkName: "home" */ "./views/Home.vue")
        },
    ]
});
