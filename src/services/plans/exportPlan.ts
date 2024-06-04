import {CellConfig, jsPDF} from "jspdf";
import {useGetPlans} from "@/services/plans/getPlans.ts";
import {EPlanDay, EPlanType} from "@/interfaces/ModelInterfaces.ts";
import autoTable from 'jspdf-autotable'
import logo from "@/assets/logo.jpg"
import moment from "moment-timezone";

export function useExportPlan() {
    const {query, getPlans, plans} = useGetPlans()

    const exportPdf = async (patientId: string, types?: string[]) => {

        const doc = new jsPDF({
            unit: "mm",
            format: "a4",
            orientation: "l"
        });
        const {data, patient} = await getData(patientId, types);
        autoTable(doc, {
            styles: {},
            startY: 1,
            columnStyles: {
                0: {
                    halign: 'center', valign: "middle", cellWidth: 33, minCellHeight: 15,
                    fontStyle: "bold", fillColor: "#0484ac", textColor: "#eee"
                },
                1: {halign: 'left', valign: "middle", cellWidth: 80, minCellHeight: 15},
                2: {halign: 'left', valign: "middle", cellWidth: 80, minCellHeight: 15},
                3: {halign: 'left', valign: "middle", cellWidth: 80, minCellHeight: 15},
            },
            head: [[{
                content: `${patient.fullname}\n ${patient.evals?.at(0)?.weight || 'N/D'}kg | ${getOld(patient.dob)}`,
                styles: {
                    minCellHeight: 10, fontStyle: "bold", halign: "center", valign: "middle",
                    fillColor: "#eee", textColor: "#0484ac"
                }
            },
                ...Object.values(EPlanType).filter((t: string) =>
                    ![EPlanType.Merienda1, EPlanType.Merienda2].includes(t)).map((type: string) => ({
                    content: type.toUpperCase(),
                    styles: {valign: "middle"}
                }))
            ]],
            body: data,

        })
        doc.output("dataurlnewwindow")

    }

    function getOld(dob: string): string {
        if (!dob) return "N/D"
        return moment().diff(moment(dob, 'YYYY-MM-DD'), 'years') + " años";
    }

    const getData = async (patientId: string, types?: string[]) => {
        types?.length > 0 && (query.replaceFilter("type", types?.join(","), "in", "and"))
        query.replaceFilter("patientId", patientId).limit(100);
        query.include("patient.eval,patient.evals,nutrient,planfoods.food.nutrient")
        await getPlans();
        const data = Object.values(EPlanDay).map((day: string) => {
            return [day.toUpperCase(), ...Object.values(EPlanType).filter((t: string) =>
                ![EPlanType.Merienda1, EPlanType.Merienda2].includes(t)).map((type: string) => {
                const filtered = plans.value.find((p: any) => p.day === day && p.type === type)
                return filtered ?
                    filtered.planfoods.reduce((acc: string[], fp: any) => {
                        acc.push(Number((fp.portion * 100).toFixed(2)) + " g de " + fp.food.name);
                        return acc;
                    }, []).join("\n") : ""
            })]
        })
        return {data, patient: plans.value.at(0).patient};

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