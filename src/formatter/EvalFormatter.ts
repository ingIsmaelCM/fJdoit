import Formatter from "@/formatter/Formatter.ts";
import {IEval} from "@/interfaces/ModelInterfaces.ts";
import {IColumns, IFilterDate} from "@/interfaces/AppInterfaces.ts";

export default class EvalFormatter extends Formatter<IEval> {

    getFilterDate(): IFilterDate {
        return {
            label: "Fecha",
            field: "createdAt"
        }
    }

    getFilterRange(): IFilterDate {
        return {
            label: "Fecha",
            field: "createdAt"
        }
    }

    build(): Array<IColumns> {
        return [
            {
                dataKey: "patient.fullname",
                key: "patient.fullname",
                title: "Paciente",
                width: 150,
            },
            {
                dataKey: "weight",
                key: "weight",
                title: "Peso",
                width: 80,
                formatter: (_row: any, _col: any, val: string) => `${val}kg`
            },
            {
                dataKey: "height",
                key: "height",
                title: "Estatura",
                width: 80,
                formatter: (_row: any, _col: any, val: string) => `${val}cm`
            },
            {
                dataKey: "imc",
                key: "imc",
                title: "IMC",
                width: 60,
                formatter: (_row: any, _col: any, val: string) => `${val}`
            },
            {
                dataKey: "note",
                key: "note",
                title: "Detalle",
                minWidth: 120
            }
        ];
    }


}