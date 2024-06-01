import {EPlanDay, EPlanType, IDiet} from "@/interfaces/ModelInterfaces.ts";
import {computed, ComputedRef, Ref} from "vue";
import {useValidation} from "@/helpers/validation.ts";
import {validators} from "@/helpers/i18n/validators.ts";
import {helpers} from "@vuelidate/validators";
const {getValidation, runFromValidation} = useValidation();

export function usePlanSuggestionValidation(diet: Ref<IDiet>) {
    const planValidation: ComputedRef<Record<string, any>> = computed(() => ({
        proteins: {
            required: validators.required,
            minValue: validators.minValue(0)
        },
        carbohidrates: {
            required: validators.required,
            minValue: validators.minValue(0)
        },
        fat: {
            required: validators.required,
            minValue: validators.minValue(0)
        },
        maxFoods: {
            required: validators.required,
            minValue: validators.minValue(1),
            maxValue: validators.maxValue(5)
        },
        days: {
            required: validators.required,
        }
    }))

    const $vSuggestions = computed(() => getValidation(planValidation, diet.value));

    return {$vSuggestions, runFromValidation}
}

export function usePlanCreateValidation(plan: Ref<any>) {
    const planValidation: ComputedRef<Record<string, any>> = computed(() => ({
        proteins: {
            required: validators.required,
            minValue: validators.minValue(0)
        },
        carbohidrates: {
            required: validators.required,
            minValue: validators.minValue(0)
        },
        fat: {
            required: validators.required,
            minValue: validators.minValue(0)
        },
        type: {
            required: validators.required,
        },
        patientId: {
            required: validators.required,
            minLength: validators.minLength(5),
            maxLength: validators.maxLength(75)
        },
        notes: {
            $each:{
                maxLength: validators.maxLength(250)
            }
        },
        foods: {
            required: validators.required,
            $each: {
                portion: {
                    required: validators.required,
                    minValue: validators.minValue(0.5),
                    maxValue: validators.maxValue(2.5)
                },
                foodId: {
                    required: validators.required,
                    minLength: validators.minLength(5),
                    maxLength: validators.maxLength(75)
                },
                day: {
                    required: validators.required,
                    isIn: validators.isIn(Object.values(EPlanDay))
                }
            }
        }
    }))
    const $vPlan=computed(()=>getValidation(planValidation, plan.value))
    return {$vPlan, runFromValidation}
}