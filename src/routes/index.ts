import {createRouter, createWebHistory, RouteLocation, RouteRecordRaw} from "vue-router";
import AuthMiddleware from "@/middlewares/AuthMiddleware.ts";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        redirect: "/home"
    },
    {
        path: "/",
        component: () => import("@/pages/layouts/AppLayout.vue"),
        meta: {
            mustAuth: true
        },
        children: [
            {
                path: "/home",
                component: () => import("@/pages/HomePage.vue"),
                name: "home"
            },
            {
                path: "/foods",
                name: "foods",
                component: () => import("@/pages/foods/FoodPage.vue"),
                meta: {
                    key: "foods"
                }
            },
            {
                path: "/foods/new",
                name: "foods_new",
                component: () => import("@/pages/foods/FoodNew.vue"),
                meta: {
                    key: "foods"
                }
            },
            {
                path: "/foods/categories",
                name: "categories",
                component: () => import("@/pages/foods/CategoryPage.vue"),
                meta: {
                    key: "foods"
                }
            },
            {
                path: "/:pathMatch(.*)*",
                component: () => import("@/pages/NotFoundPage.vue"),
                name: "notfounded",
                meta: {
                    key: "notfound",
                },
            },
        ]
    },
    {
        path: "/auth/login",
        name: "login",
        component: () => import("@/pages/auth/LoginPage.vue"),
    },
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

router.beforeEach((to: RouteLocation, _from: RouteLocation, next: Function) => {
    if (
        to.meta.mustAuth &&
        !AuthMiddleware.isAuth() &&
        !to.fullPath.includes("auth")
    ) {
        return next("/auth/login");
    } else if (to.fullPath.includes('auth') && AuthMiddleware.isAuth()) {
        return next("/");
    } else {
        return next();
    }
});
export default router;