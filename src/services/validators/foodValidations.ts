import {computed, Ref} from "vue";
import {useValidation} from "@/helpers/validation.ts";
import {validators} from "@/helpers/i18n/validators.ts";
import {ENutrientKey, IFoodView} from "@/interfaces/ModelInterfaces.ts";

export function useGetFoodValidations(food: Ref<IFoodView>) {
    const {getValidation, runFromValidation} = useValidation();
    const $vFoodRule = computed(() => getValidation(foodRule, food.value));
    const nutrientRules = [...(Object.keys(ENutrientKey).map((key: string) =>
        ({[key]: {minValue: validators.minValue(0)}})
    ))]
    const foodRule = computed(() =>
        (Object.assign({
            name: {
                required: validators.required,
                minLength: validators.minLength(3),
                maxLength: validators.maxLength(75)
            },
            categoryId: {
                required: validators.required
            },
            portion: {
                required: validators.required,
            },

        }, ...nutrientRules))
    );



    return {foodRule, $vFoodRule, runFromValidation}
}