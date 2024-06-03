import PlanFoodRepository from "@/repositories/PlanFoodRepository.ts";

export function useUnsetPlanFood(emit: Function) {
    const planfoodRepo = new PlanFoodRepository();

    const deletePlanFood = (planFoodId: string) => {
        planfoodRepo.delete(planFoodId).then(() => {
            emit("updatedPlanFood");
        })
    }

    return {
        deletePlanFood
    }
}