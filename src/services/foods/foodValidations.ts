import {computed} from "vue";
import {useValidation} from "@/helpers/validation.ts";
import {validators} from "@/helpers/i18n/validators.ts";
import {ENutrientKey} from "@/interfaces/ModelInterfaces.ts";

export function useGetFoodValidations() {
    const {getValidation, runFromValidation} = useValidation();

    const nutrientRules = [...(Object.keys(ENutrientKey).map((key: string) =>
        ({[key]: {minValue: validators.minValue(0)}})
    ))]
    const ruleForCreateFood = computed(() =>
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

    return {ruleForCreateFood, getValidation, runFromValidation}
}