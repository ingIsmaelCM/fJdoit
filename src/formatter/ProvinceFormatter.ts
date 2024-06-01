import Formatter from "@/formatter/Formatter.ts";
import {IProvince} from "@/interfaces/ModelInterfaces.ts";
import {IColumns} from "@/interfaces/AppInterfaces.ts";

export default class ProvinceFormatter extends Formatter<IProvince> {
    build(): Array<IColumns> {
        return [];
    }
}