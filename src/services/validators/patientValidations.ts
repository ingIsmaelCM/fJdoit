import {useValidation} from "@/helpers/validation.ts";
import {computed, ComputedRef, Ref} from "vue";
import {validators} from "@/helpers/i18n/validators.ts";
import { IPatientView} from "@/interfaces/ModelInterfaces.ts";
import infoValidations from "@/services/validators/infoValidations.ts";


export function usePatientValidation(patient: Ref<IPatientView>) {
    const {getValidation, runFromValidation} = useValidation();
    const patientValidation: ComputedRef<Record<string, any>> = computed(() => ({
        name: {
            required: validators.required,
            minLength: validators.minLength(2),
            maxLength: validators.maxLength(75)
        },
        lastname: {
            required: validators.required,
            minLength: validators.minLength(2),
            maxLength: validators.maxLength(75)
        },
        note: {
            minLength: validators.minLength(0),
            maxLength: validators.maxLength(250)
        },
        ...infoValidations

    }))

    const $vPatient = computed(() => getValidation(patientValidation, patient.value))

    return {
        $vPatient,
        getValidation,
        runFromValidation
    }
}