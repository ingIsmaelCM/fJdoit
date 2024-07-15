import {RouteRecordRaw} from "vue-router";


export const reminderRoutes: Array<RouteRecordRaw>=[
    {
        path: "reminders",
        name: "reminders",
        component: ()=>import("@/pages/reminders/ReminderPage.vue"),
        meta:{
            title: "Recordatorios",
            key: "reminders"
        }
    },
    {
        path: "reminders/new",
        name: "reminders_new",
        component: ()=>import("@/pages/reminders/ReminderNew.vue"),
        meta:{
            title: "Nuevo Recordatorio",
            key: "reminders"
        }
    }
]