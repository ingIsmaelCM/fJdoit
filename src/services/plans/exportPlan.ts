import {CellConfig, jsPDF} from "jspdf";
import {useGetPlans} from "@/services/plans/getPlans.ts";
import {EPlanDay} from "@/interfaces/ModelInterfaces.ts";
import autoTable from 'jspdf-autotable'
import logo from "@/assets/icon.jpg"

export function useExportPlan() {
    const {query, getPlans, plans} = useGetPlans()

    const exportPdf = async (row: any) => {
        const doc = new jsPDF({
            unit: "mm",
            format: "letter"
        });
        const data = await getData(row);
        doc.text(`Menú de ${row.type}`, 33, 10, {})
        console.log(logo)
        doc.addImage(logo, "JPEG", 13, 0, 0, 20);

        autoTable(doc, {
            styles: {},
            startY:25,
            columnStyles: {
                0: {
                    halign: 'center', valign: "middle", cellWidth: 30, minCellHeight: 25,
                    fontStyle: "bold", fillColor: "#0484ac", textColor: "#eee"
                },
                1: {halign: 'left', valign: "middle", cellWidth: 100, minCellHeight: 25},
                2: {halign: 'left', valign: "middle", minCellHeight: 25},
            },
            head: [[{
                content: "DÍA",
                styles: {minCellHeight: 10, fontStyle: "bold", halign: "center", valign: "middle"}
            }, {
                content: "DETALLES",
                styles: {valign: "middle"}
            }, {
                content: "OBSERVACIONES",
                styles: {valign: "middle"}
            }]],
            body: data
        })
        doc.output("dataurlnewwindow")

    }

    const getData = async (row: any) => {
        query.replaceFilter("type", row.type);
        query.replaceFilter("patientId", row.patientId);
        await getPlans();
        return Object.values(EPlanDay).map((day: string) => {
            const filtered = plans.value.find((p: any) => p.day === day)
            return filtered ? [
                day.toUpperCase(),
                filtered.planfoods.reduce((acc: string[], fp: any) => {
                    acc.push((fp.portion * 100).toFixed(2) + " g de " + fp.food.name);
                    return acc;
                }, []).join("\n"),
                filtered.note || ''
            ] : [day.toUpperCase(),]
        })

    }
    const getConfig = () => {
        return {
            headerBackgroundColor: "#0484ac",
            headerTextColor: "#ffffff",
            autoSize: false
        }
    }

    const getHeaders: CellConfig[] = () => {
        return [
            {
                id: "day",
                name: "day",
                prompt: "Día",
                width: 40,
                align: "center",
                padding: 0,

            },
            {
                id: "detail",
                name: "detail",
                prompt: "Detalles",
                width: 165,
                align: "left",
                padding: 0
            },
            {
                id: "note",
                name: "note",
                prompt: "Notas",
                width: 60,
                align: "center",
                padding: 0
            }
        ]
    }

    return {
        exportPdf,
        getData

    }
}