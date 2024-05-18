import Formatter from "@/formatter/Formatter.ts";
import {IColumns} from "@/interfaces/AppInterfaces.ts";
import {IFoodView} from "@/interfaces/ModelInterfaces.ts";

export default class FoodFormatter extends Formatter<IFoodView> {
    build(): Array<IColumns> {
        return [
            {
                dataKey: "portion",
                key: "portion",
                title: "Porc.",
                width: 70,
            },
            {
                dataKey: "name",
                key: "name",
                title: "Nombre",
                sortable: true,
                minWidth: 150,
            },
            {
                dataKey: "categoryName",
                key: "categoryName",
                title: "Grupo",
                sortable: true,
                width:105
            },
            {
                dataKey: "proteins",
                key: "proteins",
                title: "Prot.",
                sortable: true,
                width:100
            },
            {
                dataKey: "carbohidrates",
                key: "carbohidrates",
                title: "Carbo",
                sortable: true,
                width:100
            },
            {
                dataKey: "fat",
                key: "fat",
                title: "Grasa",
                sortable: true,
                width:100
            },
            {
                dataKey: "calories",
                key: "calories",
                title: "Cal.",
                sortable: true,
                width:100
            }
        ];
    }
}