
import {ITour} from "@/interfaces/AppInterfaces.ts";

export const homeTour: Record<string, ITour>={
    plans:{
        target:"#plans",
        title:"Filtrar Planes",
        description:"Accede a los planes registrados según tipo de comida (Desayuno, Almuerzo o Cena) haciendo click sobre el botón correspondiente."
    },
    calendar:{
        target:"#calendar",
        title:"Calendario",
        description:"Consulta rápidamente tus recordatorios pendientes del mes actual, para una mejor gestión del tiempo."
    },
    patients:{
        target:"#lastPatients",
        title:"Últimos Pacientes",
        description:"Lista de los últimos pacientes añadidos al sistema."
    },
    whatsapp:{
        target:"#whatsapp",
        title:"Gestiona WhatsApp",
        description:"Conecta tu cuenta de WhatsApp para que puedas enviar mensajes a los pacientes y recibir notificaciones desde el sistema."
    },
    tasks:{
        target:"#tasks",
        title:"Tareas Recientes",
        description:"Un listado de las últimas tareas registradas marcadas como pendientes. El icono inicial indica el tipo de tarea"
    }
}