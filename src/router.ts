import Vue from "vue";
import Router from "vue-router";
import MainItems from "./views/MainItems.vue";
import SingleClassJob from "./views/SingleClassJob.vue";

Vue.use(Router);

// todo: Add different routes, left as a place holder for when route will be needed
export default new Router({
    mode: "hash",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "*",
            redirect: "/items"
        },
        {
            path: "/items",
            component: MainItems
        },
        {
            path: "/classes",
            component: SingleClassJob
        }
    ],
});
