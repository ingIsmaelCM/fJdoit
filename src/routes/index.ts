import {createRouter, createWebHashHistory, RouteLocation, RouteRecordRaw} from "vue-router";
import AuthMiddleware from "@/middlewares/AuthMiddleware.ts";
import {patientRoutes} from "@/routes/patients.ts";
import {foodRoutes} from "@/routes/foods.ts";
import {planeRoutes} from "@/routes/plans.ts";
import {evalRoutes} from "@/routes/evals.ts";
import {profileRoutes} from "@/routes/profile.ts";
import utils from "@/helpers/utils.ts";
import {reminderRoutes} from "@/routes/reminders.ts";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        redirect: "/home"
    },
    {
        path: "/",
        component: () => import("@/pages/layouts/AppLayout.vue"),
        meta: {
            mustAuth: true,
            mustPhone: true,
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
            ...profileRoutes,
            ...reminderRoutes,
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
    history: createWebHashHistory()
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
        if(to.meta.mustPhone && !AuthMiddleware.hasPhone()){
            utils.showNoti(({
                title: "Perfile Incompleto",
                message: "Complete su perfil y añada su teléfono",
                duration: 5000,
                position: "bottom-right",
                type: "error"
            }))
            return next("/profile");
        }
        return next();
    }
});

export default router;