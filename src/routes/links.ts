export interface ILink {

    title: string;
    icon: string;
    path?: string;
    key: string;
    id: string;
    childs?: ILink[]
}

const links: Array<ILink> = [

    {
        id: "2",
        title: "Pacientes",
        icon: "ic:baseline-group",
        key: "patients",
        childs: [
            {
                id: "2-1",
                title: "Registrar",
                icon: "ic:round-person-add-alt-1",
                path: "/patients/new",
                key: "patients"
            },
            {
                id: "2-2",
                title: "Buscar",
                icon: "ic:round-person-search",
                path: "/patients",
                key: "patients"
            },
            {
                id: "2-3",
                title: "Consultas",
                icon: "maki:doctor",
                path: "/evals",
                key: "patients"
            }
        ]
    },
    {
        id: "3",
        title: "Planes",
        icon: "ic:round-text-snippet",
        key: "plans",
        childs: [
            {
                id: "3-1",
                title: "Crear",
                icon: "ic:outline-note-add",
                path: "/plans/new",
                key: "plans"
            },
            {
                id: "3-2",
                title: "Buscar",
                icon: "ic:baseline-manage-search",
                path: "/plans",
                key: "plans"
            },
            {
                id: "3-3",
                title: "Plantillas",
                icon: "tabler:template",
                path: "/plans/templates",
                key: "plans"
            }
        ]
    },

    {
        id: "4",
        title: "Alimentos",
        icon: "ic:baseline-fastfood",
        key: "foods",
        childs: [
            {
                id: "4-1",
                title: "Registrar",
                icon: "ic:twotone-playlist-add",
                path: "/foods/new",
                key: "foods"
            },
            {
                id: "4-2",
                title: "Buscar",
                icon: "mdi:food-outline",
                path: "/foods",
                key: "foods"
            },
            {
                id: "4-3",
                title: "Categorías",
                icon: "ic:round-filter-alt",
                path: "/foods/categories",
                key: "foods"
            }
        ]
    },
    {
        id: "5",
        title: "Agenda",
        icon: "ic:round-task",
        key: "reminders",
        childs: [
            {
                id: "5-1",
                title: "Agendar",
                icon: "ic:round-add-task",
                path: "/reminders/new",
                key: "reminders"
            },
            {
                id: "5-2",
                title: "Recordatorios",
                icon: "fluent:task-list-24-filled",
                path: "/reminders",
                key: "reminders"
            },
            {
                id: "5-3",
                title: "Calendario",
                icon: "ic:baseline-calendar-month",
                path: "/reminders/calendar",
                key: "reminders"
            }
        ]
    }
]

export default links;