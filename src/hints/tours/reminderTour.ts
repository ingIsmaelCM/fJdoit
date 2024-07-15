import {ITour} from "@/interfaces/AppInterfaces.ts"
export  const createReminderTour: Record<string, ITour>={
    formCreateReminder: {
        target: "#formCreateReminder",
        title: "Conecte su WhatsApp",
        description: "Antes de registrar un recordatorio, le recomendamos que conecte su cuenta de WhatsApp a la aplicación. Es preferible que sea un número distinto al de su perfil, para que le lleguen las notificaciones."
    },
    title: {
        target: "#title",
        title: "Título",
        description: "Título corto para identificar el recordatorio. Será el texto enviado en la notificación."
    },
    type: {
        target: "#type",
        title: "Tipo o Recurrencia",
        description: "Indica si la notificación del recordatorio debe enviarse una única vez o de manera recurrente."
    },
    description: {
        target: "#description",
        title: "Descripción o detalle",
        description: "Ingrese una descripción más completa y explicativa acerca de qué trata el recordatorio. Puede ingresar hasta 250 caracteres."
    },
    day: {
        target: "#day",
        title: "Día del recordatorio",
        description: "Indique la fecha (día y mes) en que desea recibir el recordatorio. El campo es opcional y, si no lo indica, el sistema asumirá la próxima fecha disponible o todos los días (si es una tarea recurrente)."
    },
    time: {
        target: "#time",
        title: "Hora del recordatorio",
        description: "Indique la hora (minuto y hora) en que desea recibir el recordatorio. El campo es opcional y, si no lo indica, el sistema asumirá el próximo minuto disponible o todos los minutos (si es una tarea recurrente)."
    },
    dayName: {
        target: "#dayName",
        title: "Día de la semana",
        description: "Si desea que un recordatorio se envíe semanalmente, indique el día de la semana. Para que funcione, deberá dejar el campo de fecha vacío. Ese campo es opcional."
    },

}