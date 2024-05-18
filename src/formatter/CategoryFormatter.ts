import Formatter from "@/formatter/Formatter.ts";
import {ICategory} from "@/interfaces/ModelInterfaces.ts";
import {IColumns} from "@/interfaces/AppInterfaces.ts";

export default class CategoryFormatter extends Formatter<ICategory> {
    build(): Array<IColumns> {
        return [
            {
                dataKey: "name",
                key: "name",
                title: "Nombre",
                sortable: true
            }
        ];
    }
}