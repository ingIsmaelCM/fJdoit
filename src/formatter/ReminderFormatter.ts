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
                width: 150
            },
            {
                key:"description",
                dataKey: "description",
                title: "Descripción",
                minWidth: 150
            },
            {
                key:"dueAt",
                dataKey: "dueAt",
                title: "Fecha",
                width: 175,
                formatter: (_row:any, _col:any, val:string)=>moment(val).format("D/M/Y h:m A")
            }
        ];
    }
}