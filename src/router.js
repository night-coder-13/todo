import { createRouter,createWebHistory } from "vue-router";

import Home from "./components/page/home.vue";
import FilterPro from "./components/filter/filter.vue";


const routes=[
    {path : '/' , component : Home , name : 'Home'},
    {path : '/filter' , component : FilterPro , name : 'FilterPro'},
]
const router = createRouter({
    history : createWebHistory(),
    routes: routes
})

export default router;