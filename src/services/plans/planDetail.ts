import {Ref, ref} from "vue";
import {useGetPlans, useSetPlan} from "@/services/plans";
import {EPlanDay, EPlanType} from "@/interfaces/ModelInterfaces.ts";
import html2canvas from "html2canvas";


export function usePlanDetail() {

    const {plans, query, getPlans} = useGetPlans();
    const {sendWhatsapp} = useSetPlan();

    const planData = ref([]);
    const patient: Ref<any> = ref({});
    const currentCaption = ref("Plan Nutricional");

    const getData = async (patientId: string, types?: string[]) => {
        query.replaceFilter("patientId", patientId).limit(100)
            .replaceFilter("day", Object.values(EPlanDay)
                .filter((d: any) => d !== EPlanDay.D && d !== EPlanDay.S), "in", "and")
        query.include("patient.eval,patient.evals,nutrient,planfoods.food.nutrient")
        await getPlans();

        const data = Object.values(EPlanDay)
            .filter((d: any) => d !== EPlanDay.D && d !== EPlanDay.S).map((day: string) => {
                const filterByType = Object.values(EPlanType).filter((t: string) =>
                    ![EPlanType.Merienda1, EPlanType.Merienda2].includes(<any>t));
                const getNutrientSum = (field: string) => plans.value.filter(p => filterByType
                    .includes(p.type) && p.day === day  )
                    .reduce((acc: number, plan: any) => acc + Number(plan[field]), 0)
                return {
                    day: day.toUpperCase(),
                    foodPlans: filterByType.map((type: string) => {
                        const filtered = plans.value.find((p: any) => p.day === day && p.type === type)
                        return filtered ?
                            filtered.planfoods.reduce((acc: string[], fp: any) => {
                                const meal = `${Number((fp.portion * 100).toFixed(2)) + "g de " + fp.food.name}`
                                acc.push(meal);
                                return acc;
                            }, []) : []
                    }),
                    notes: filterByType.map((type: string) => {
                        const filtered = plans.value.find((p: any) => p.day === day && p.type === type)
                        return filtered && filtered.note
                    }),
                    nutrients: {
                        calories: getNutrientSum('realCalories'),
                        proteins: getNutrientSum('realProteins'),
                        fat: getNutrientSum('realFat'),
                        carbohidrates: getNutrientSum('realCarbohidrates'),
                    }
                }

            })
        console.log( plans.value?.at(0))
        return {data, patient: plans.value?.at(0)?.patient};

    }


    const generatePlanImage = async () => {
        const planMenu = document.querySelector(`#planMenu`);
        planMenu?.classList.add("ready-fix");
        const canvas = await html2canvas(planMenu, {
            allowTaint: true,
            useCORS: true,
            scale: window.devicePixelRatio,
            foreignObjectRendering: true
        });
        const dataUrl = canvas.toDataURL('image/jpeg');
        return new Promise((resolve: any, reject: any) => {
            fetch(dataUrl)
                .then(res => res.blob())
                .then(async (blob: Blob) => {
                    const file = new File([blob], `${patient.value.fullname}_${currentCaption.value}`,
                        {type: "image/jpeg"});
                    planMenu?.classList.remove("ready-fix");
                    resolve(file)
                }).catch((error: any) => reject(error));
        })
    }
    const downloadPlan = async () => {
        const file = await generatePlanImage();
        const url = URL.createObjectURL(file);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${patient.value.fullname}_${currentCaption.value}`;
        link.click();
    }
    const sendPlanWhatsapp = async () => {
        const file = await generatePlanImage();
        await sendWhatsapp(patient.value.id, {file, caption: currentCaption.value})
    }
    return {
        planData,
        patient,
        currentCaption,
        getData,
        downloadPlan,
        sendPlanWhatsapp
    }
}