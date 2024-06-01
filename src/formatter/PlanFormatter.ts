import Formatter from "@/formatter/Formatter.ts";
import {EPlanDay, EPlanType, IPlan} from "@/interfaces/ModelInterfaces.ts";
import {IColumns} from "@/interfaces/AppInterfaces.ts";

export default class PlanFormatter extends Formatter<IPlan> {
    hasSummary = true;

    build(): Array<IColumns> {
        return [
            {
                dataKey: "patientName",
                key: "patientName",
                title: "Paciente",
                minWidth: 175,
                fixed: true
            },
            {
                dataKey: "type",
                key: "type",
                title: "Tipo",
                filters: Object.values(EPlanType).map((type) => ({
                    text: type,
                    value: type
                })),
                width: 100,
            },
            {
                dataKey: "day",
                key: "day",
                title: "Día",
                width: 110,
                filters: Object.values(EPlanDay).map((day) => ({
                    text: day,
                    value: day
                })),
            },
            {
                dataKey: "realProteins",
                key: "realProteins",
                title: "Proteínas",
                sortable: true,
                summable: true,
                width: 85

            },
            {
                dataKey: "realFat",
                key: "realFat",
                title: "Grasas",
                sortable: true,
                summable: true,
                width: 85

            },
            {
                dataKey: "realCarbohidrates",
                key: "realCarbohidrates",
                title: "Carbo",
                sortable: true,
                summable: true,
                width: 85

            },
            {
                dataKey: "realCalories",
                key: "realCalories",
                title: "Calorías",
                sortable: true,
                summable: true,
                width: 85

            },
            {
                dataKey: "note",
                key: "note",
                title: "Nota",
                minWidth: 150
            },
        ];
    }
}