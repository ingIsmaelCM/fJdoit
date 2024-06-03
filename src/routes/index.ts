import {createRouter, createWebHistory, RouteLocation, RouteRecordRaw} from "vue-router";
import AuthMiddleware from "@/middlewares/AuthMiddleware.ts";
import {patientRoutes} from "@/routes/patients.ts";
import {foodRoutes} from "@/routes/foods.ts";
import {planeRoutes} from "@/routes/plans.ts";
import {evalRoutes} from "@/routes/evals.ts";

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
                name: "home",
                meta: {
                    title: "Dashboard"
                }
            },
            ...foodRoutes,
            ...patientRoutes,
            ...planeRoutes,
            ...evalRoutes,
            {
                path: "/:pathMatch(.*)*",
                component: () => import("@/pages/NotFoundPage.vue"),
                name: "notfounded",
                meta: {
                    key: "notfound",
                    title: "Página no encontrada"
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