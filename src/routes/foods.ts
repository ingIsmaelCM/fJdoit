import {RouteRecordRaw} from "vue-router";

export const foodRoutes: RouteRecordRaw[] = [
    {
        path: "/foods",
        name: "foods",
        component: () => import("@/pages/foods/FoodPage.vue"),
        meta: {
            key: "foods",
            title: "Alimentos"
        }
    },
    {
        path: "/foods/new",
        name: "foods_new",
        component: () => import("@/pages/foods/FoodNew.vue"),
        meta: {
            key: "foods",
            title: "Registrar alimento"
        }
    },
    {
        path: "/foods/categories",
        name: "categories",
        component: () => import("@/pages/foods/CategoryPage.vue"),
        meta: {
            key: "foods",
            title: "Grupos alimenticios"
        }
    }
]