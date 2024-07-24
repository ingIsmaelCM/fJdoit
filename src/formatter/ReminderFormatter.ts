import Formatter from "@/formatter/Formatter.ts";
import {IReminder} from "@/interfaces/ModelInterfaces.ts";
import {IColumns} from "@/interfaces/AppInterfaces.ts";
import moment from "moment-timezone";

export default class ReminderFormatter extends Formatter<IReminder> {
    build(): Array<IColumns> {
        return [
            {
                key:"title",
                dataKey: "title",
                title: "Título",
                minWidth: 200
            },
            {
                key:"patient",
                dataKey: "patient",
                title: "Paciente",
                width: 150,
                formatter:(row:IReminder)=>{
                    return row.patient?.fullname||'N/D'
                }
            },
            {
                key:"dueAt",
                dataKey: "dueAt",
                title: "Fecha",
                width: 150,
                formatter: (_row:any, _col:any, val:string)=>moment(val).format("D/MM/YYYY H:m")
            }
        ];
    }
}