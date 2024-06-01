import PlanFoodRepository from "@/repositories/PlanFoodRepository.ts";
import {ref} from "vue";

export function useSetPlanFood(emit: Function) {
    const planfoodRepo = new PlanFoodRepository();
    const key = ref(0)
    const updatePlanFood = async (planFood: Record<string, any>) => {
        planfoodRepo.update(planFood.id, planFood).then((res) => {
            key.value++;
            emit("updatedPlanFood");
        })
    }

    return {
        key,
        updatePlanFood
    }
}