import * as VueRouter from "vue-router";
import store from "@/store";
// 使用 .meta.globEager 导入多个模块 —— vite 新特性
const routeModules = import.meta.globEager("../apps/**/routes/index.ts");

const routes = [
    {
        path: "/",
        name: "Welcome",
        component: () => import("../views/Welcome.vue"),
    },
    {
        path: "/home",
        name: "Home",
        component: () => import("../views/Home.vue"),
    },
    {
        path: "/404",
        name: "404",
        component: () => import("../views/404.vue")
    }
];

// 将路由模块遍历解构
for (const element in routeModules) {
    let routeModule = routeModules[element];
    routes.push(...routeModule["route"]);
}

// 定义 history 路由模式
const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
});

// 导航守卫
router.beforeEach((to, from, next) => {
    // 切换页面时重置加载状态
    store.commit('CHANGE_LOADING_STATUS', 0);
    // 访问Home页且未登录，跳转登录
    if (to.name === "Home" && !localStorage.token) next({name: "Login"})
    // 其他情况默认允许
    else next()
})

export default router;
