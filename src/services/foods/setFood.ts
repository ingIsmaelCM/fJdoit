import FoodRepository from "@/repositories/FoodRepository.ts";
import FoodFormatter from "@/formatter/FoodFormatter.ts";
import { ref, Ref} from "vue";
import {ENutrientKey, IFoodView} from "@/interfaces/ModelInterfaces.ts";
import {useGetFoodValidations} from "@/services/validators/foodValidations.ts";

export function useSetFood(emit?: Function) {
    const foodRepo = new FoodRepository();
    const foodFormatter = new FoodFormatter();
    const food: Ref<IFoodView> = ref(foodFormatter.init());
    const key = ref(0);
    const {$vFoodRule, runFromValidation} = useGetFoodValidations(food);




    const createFood = async () => {
        await runFromValidation($vFoodRule.value, async () => {
            await foodRepo.save(food.value).then(() => {
                food.value = foodFormatter.init();
                key.value = new Date().getTime();
                emit && emit("foodCreated");
                initNutrient();
            });
        })

    }

    const updateFood = async () => {
        await runFromValidation($vFoodRule.value, async () => {
            await foodRepo.update(food.value.id, food.value).then(() => {
                key.value = new Date().getTime();

            })
        });
    }

    const initNutrient = () => {
        Object.keys(ENutrientKey).forEach((key: string) => {
            food.value[key] = Number(food.value[key]) || 0.00
        });
        food.value.portion = "100g"
    }
    initNutrient();


    return {
        food,
        key,
        createFood,
        updateFood,
        $vFoodRule: $vFoodRule.value
    }

}