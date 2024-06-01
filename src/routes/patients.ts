import {RouteRecordRaw} from "vue-router";

export const patientRoutes: RouteRecordRaw[]=[
    {
        path: "/patients",
        name: "patients",
        component: () => import("@/pages/patients/PatientPage.vue"),
        meta: {
            key: "patients",
            title: "Pacientes"
        }
    },
    {
        path: "/patients/new",
        name: "patients_new",
        component: () => import("@/pages/patients/PatientNew.vue"),
        meta: {
            key: "patients",
            title: "Registrar Paciente"
        }
    },
    {
        path: "/patients/:id/details",
        name: "patients_show",
        component: () => import("@/pages/patients/PatientShow.vue"),
        meta: {
            key: "patients",
            title: "Detalles del paciente"
        }
    }
]