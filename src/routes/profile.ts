import {RouteRecordRaw} from "vue-router";

export const profileRoutes: RouteRecordRaw[]=[
    {
        path: "/profile",
        name: "profile",
        component:()=>import("@/pages/profile/ProfilePage.vue"),
        meta:{
            title: "Perfil"
        }
    }
]