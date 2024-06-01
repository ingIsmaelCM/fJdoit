import {validators} from "@/helpers/i18n/validators.ts";
import {useValidation} from "@/helpers/validation.ts";
import {computed} from "vue";

export function useCategoryValidation() {
    const {getValidation, runFromValidation} = useValidation();

    const categoryRules = computed(() => ({
        name: {
            required: validators.required,
            minLength: validators.minLength(3),
            maxLength: validators.maxLength(75)
        }
    }));
    return {
        categoryRules,
        getValidation,
        runFromValidation
    }
}