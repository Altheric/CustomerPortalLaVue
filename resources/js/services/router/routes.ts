//Imports
import type { RouteRecordRaw } from "vue-router";
import Overview from "../../domains/customerportal/Overview.vue";

//Routes
export const siteRoutes: RouteRecordRaw[] = [
    { path: '/', component: Overview },
]