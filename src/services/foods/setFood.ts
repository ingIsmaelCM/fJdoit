import FoodRepository from "@/repositories/FoodRepository.ts";
import FoodFormatter from "@/formatter/FoodFormatter.ts";
import {ref, Ref} from "vue";
import {ENutrientKey, IFoodView} from "@/interfaces/ModelInterfaces.ts";
import {useGetFoodValidations} from "@/services/foods/foodValidations.ts";

export function useSetFood(emit?: Function) {
    const foodRepo = new FoodRepository();
    const foodFormatter = new FoodFormatter();
    const food: Ref<IFoodView> = ref(foodFormatter.init());
    const key = ref(0);
    const {ruleForCreateFood, runFromValidation, getValidation} = useGetFoodValidations();


    const $vCreateFood = getValidation(ruleForCreateFood, food.value);

    const createFood = async () => {
        await runFromValidation($vCreateFood, async () => {
            await foodRepo.save(food.value).then(() => {
                food.value = foodFormatter.init();
                key.value = new Date().getTime();
                emit && emit("foodCreated");
                initNutrient();
            });
        })

    }

    const updateFood = async () => {
        await foodRepo.update(food.value.id, food.value).then(() => {
            key.value = new Date().getTime();
            emit && emit("foodUpdated");
        })
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
        $vCreateFood
    }

}