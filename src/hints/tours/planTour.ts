import {ITour} from "@/interfaces/AppInterfaces.ts";

export const createPlanTour: Record<string, ITour>={
    proteins: {
        target: "#proteins",
        title: "Proteínas",
        description: "Ingrese el monto en gramos de proteínas que debe contener el plan diario."
    },
    carbohidrates: {
        target: "#carbohidrates",
        title: "Carbohidratos",
        description: "Ingrese el monto en gramos de carbohidratos que debe contener el plan diario."
    },
    fat: {
        target: "#fat",
        title: "Grasas",
        description: "Ingrese el monto en gramos de grasas que debe contener el plan diario."
    },
    maxFoods: {
        target: "#maxFoods",
        title: "Máximo de Alimentos",
        description: "Indique cuántos alimentos distintos puede contener cada plato (máx. 5)."
    },
    days: {
        target: "#days",
        title: "Días",
        description: "Seleccione los días se la semana para los que desea generar un plan nutricional."
    },
    omitCrude: {
        target: "#omitCrude",
        title: "Filtrar Crudos",
        description: "Indique si desea sólo alimentos cocidos o si desea incluir los crudos (opcional)."
    },
    categoryIds: {
        target: "#categoryIds",
        title: "Filtrar por Categorías",
        description: "Seleccione las categorías específícas con las que desea armar este plan (opcional)."
    },
    type: {
        target: "#type",
        title: "Tipo de comida",
        description: "Indique para cuál de los cinco platos del día desea generar el plan."
    },
    patientId: {
        target: "#patientId",
        title: "Paciente",
        description: "Seleccione el paciente al que corresponde este plan nutricional."
    },
    addNewFood: {
        target: "#addNewFood",
        title: "Añada Alimentos Manualmente",
        description: "Añada alimentos, días y porción para el plan de manera manual."
    },
    generateSuggestion: {
        target: "#generateSuggestion",
        title: "Sugerencias Automáticas",
        description: `Genere sugerencias automáticas con base en los parámetros ingresados. El sistema creará un plan 
        nutricional aproximado según los datos ingresados (debe tener más de 500 registros de alimentos), el cual podrá
        editar a detalle, según lo desee.`
    },
}