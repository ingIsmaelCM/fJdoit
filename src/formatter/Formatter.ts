import {
    IColumns,
    IFilterDate,
    SummaryMethodProps,
} from "@/interfaces/AppInterfaces";
import utils from "../helpers/utils";
import {IExportable} from "@/exports/Exportation";
import {computed, ref} from "vue";

interface Formatter<T> {
    getFilterRange?(): IFilterDate;

    getFilterDate?(): IFilterDate;
}

 abstract class Formatter<T> {
    abstract build(): Array<IColumns>;
    hasSummary: boolean = false;
    indexTotal: number = 0;
    sumLabel:string="Total";
    exportable: boolean = false;
    protected columns: IColumns[]=[];

    selectedRef = ref([]);

    selected = computed(() => {
        return this.selectedRef
    });

    getCols(): Array<IColumns<T>> {

        if(this.columns.length===0){
            this.columns=this.build();
        }
        return this.columns;
    }

    addCol(col: IColumns, append:boolean=true){
        this.getCols();
        append?this.columns.push(col):this.columns.unshift(col);
    }
     removeCols(from: number, to: number){
         this.getCols();
         this.columns.splice(from, to);
     }

    getSummaries = ({data}: SummaryMethodProps) => {
        const cols = this.getCols();
        const sums: string[] = [];
        cols.forEach((col, index) => {
            let items:any|any[]=[];
            if (col.summable) {
                const values = data.map((item) => {
                    let dataKey=col.dataKey;
                    if (dataKey.includes(".")) {
                        const nestedObject=dataKey.split('.')[0];
                        item=item[nestedObject];
                        items.push(item);
                        dataKey=dataKey.split('.')[1]

                    } else{
                        items=data;
                    }
                    return Number(item?item[dataKey]:0)
                });
                if (!isNaN(values.reduce((a, b) => a + b, 0))) {
                    sums[index] = utils.formatNumber(
                        col.sumAction?
                            Number(col.sumAction(items.filter((it:any)=>Boolean(it)))):
                            Number(values.reduce((a, b) => a + b, 0).toFixed(2)),1
                    );
                }
            } else {
                sums[index] = "";
            }
        });
        sums[this.indexTotal] = this.sumLabel;
        return sums;
    };

    exportableCols(): Array<IExportable<T>> {
        return [];
    }

    init(): T | any {
        return {};
    }
}


export  default  Formatter