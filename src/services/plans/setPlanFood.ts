import PlanFoodRepository from "@/repositories/PlanFoodRepository.ts";
import {ref} from "vue";
import {IPlanFood} from "@/interfaces/ModelInterfaces.ts";

export function useSetPlanFood(emit: Function) {
    const planfoodRepo = new PlanFoodRepository();
    const key = ref(0)

    const createPlanFood = async (planFood: Record<string, any>) => {
        planfoodRepo.save(<IPlanFood>planFood).then(() => {
            key.value++;
            emit("updatedPlanFood");
        })
    }
    const updatePlanFood = async (planFood: Record<string, any>) => {
        planfoodRepo.update(planFood.id, <IPlanFood>planFood).then(() => {
            key.value++;
            emit("updatedPlanFood");
        })
    }

    return {
        key,
        createPlanFood,
        updatePlanFood
    }
}