import {RouteRecordRaw} from "vue-router";


export const evalRoutes: Array<RouteRecordRaw> = [
    {
        path: "/evals",
        name: "evals",
        component: () => import("@/pages/evals/EvalPage.vue"),
        meta: {
            title: "Consultas y Evaluaciones"
        }
    }
]