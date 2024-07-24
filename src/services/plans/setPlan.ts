import PlanRepository from "@/repositories/PlanRepository.ts";
import PlanFormatter from "@/formatter/PlanFormatter.ts";
import {ref, Ref} from "vue";
import {EPlanDay, IDiet, IPlan} from "@/interfaces/ModelInterfaces.ts";
import {EAxiosVerb} from "@/interfaces/AppInterfaces.ts";
import {usePlanCreateValidation, usePlanSuggestionValidation} from "@/services/validators/planValidation.ts";
import QueryService from "@/services/QueryService.ts";
import emitter from "@/helpers/emitter.ts";

export function useSetPlan() {
    const planRepo = new PlanRepository();
    const planFormatter = new PlanFormatter();
    const plan: Ref<IPlan> = ref(planFormatter.init());
    const query = new QueryService();
    const diet: Ref<IDiet & Partial<IPlan>> = ref({
        proteins: 0,
        fat: 0,
        carbohidrates: 0,
        maxFoods: 3,
        days: Object.keys(EPlanDay).filter((d: string) => !["D", "S"].includes(d)),
        notes: {}
    });

    const {$vSuggestions, runFromValidation} = usePlanSuggestionValidation(diet);
    const {$vPlan, runFromValidation: runForCreate} = usePlanCreateValidation(plan);

    emitter.on("dietsChanged", receivedDiets => {
        plan.value.foods = (<any[]>receivedDiets).map((rDiet: any) => <any>({
            foodId: rDiet.id,
            portion: rDiet.portion,
            day: rDiet.day,
            notes: {}
        }));
    })

    const getSuggestions = async () => {
        runFromValidation($vSuggestions.value, async () => {
            return planRepo.custom(`/plans/suggestions${query.parsed.value}`, EAxiosVerb.Post, {
                ...diet.value,
                days: diet.value.days.join("")
            }).then((res: any) => {
                return res;
            })

        }).then()
    }

    const sendWhatsapp = async (patientId: string, data: object) => {
        planRepo.sendFile(`/plans/${patientId}/sendwhatsapp`, data)
            .then((res: any) => {
                return res;
            })
    }
    const createPlan = async () => {
        Object.assign(plan.value, diet.value);null
        runForCreate($vPlan.value, async () => {
            return planRepo.save(plan.value).then(() => {
                plan.value = planFormatter.init();
                emitter.emit("updatedDiets", [])
                diet.value = {
                    proteins: 0,
                    fat: 0,
                    carbohidrates: 0,
                    maxFoods: 3,
                    days: Object.keys(EPlanDay).filter((d: string) => !["D", "S"].includes(d)),
                    notes: {}
                }
            })
        }).then()
    }

    return {
        plan,
        diet,
        query,
        $vSuggestions: $vSuggestions.value,
        $vPlan: $vPlan.value,
        createPlan,
        getSuggestions,
        sendWhatsapp
    }
}