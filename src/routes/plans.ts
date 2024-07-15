import {RouteRecordRaw} from "vue-router";

export  const planeRoutes: Array<RouteRecordRaw>=[
    {
        path: "/plans",
        name: "plans",
        component:()=>import("@/pages/plans/PlanPage.vue"),
        meta:{
            key: "plans",
            title:"Planes Nutricionales"
        }
    },
    {
        path: "/plans/new",
        name: "plans_new",
        component:()=>import("@/pages/plans/PlanNew.vue"),
        meta:{
            key: "plans",
            title:"Creación de plan nutricional"
        }
    },
    {
        path: "/plans/:id/pdf",
        name: "plans_pdf",
        component:()=>import("@/pages/plans/PlanMenu.vue"),
        meta:{
            key: "plans",
            title:"Diseño del Menú"
        }
    }
]