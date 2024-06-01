import Formatter from "@/formatter/Formatter.ts";
import {IPatient, IPatientView} from "@/interfaces/ModelInterfaces.ts";
import {IColumns} from "@/interfaces/AppInterfaces.ts";

export default class PatientFormatter extends Formatter<IPatient> {
    build(): Array<IColumns> {
        return [
            {
                dataKey: "code",
                key: "code",
                sortable: true,
                title: "Cód.",
                minWidth: 80,
                fixed: true,
            },
            {
                dataKey: "name",
                key: "name",
                sortable: true,
                title: "Nombre",
                minWidth: 150,
                fixed: true,
                formatter: (row: IPatientView) => row.fullname
            },
            {
                dataKey: "phone",
                key: "phone",
                sortable: true,
                title: "Teléfono",
                width: 150
            },
            {
                dataKey: "line1",
                key: "line1",
                sortable: true,
                title: "Dirección",
                width: 180,
                formatter: (_row: any, _col: any, value: string) => value || 'N/D'
            },
            {
                dataKey: "municipe",
                key: "municipe",
                sortable: true,
                title: "Municipio",
                width: 200,
                formatter: (_row: any, _col: any, value: string) => value || 'N/D'
            }
        ];
    }
}