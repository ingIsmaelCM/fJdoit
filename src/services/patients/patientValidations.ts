import {useValidation} from "@/helpers/validation.ts";
import {computed, ComputedRef, Ref} from "vue";
import {validators} from "@/helpers/i18n/validators.ts";
import {EInfoGender, IPatientView} from "@/interfaces/ModelInterfaces.ts";


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
        phone: {
            required: validators.required,
            minLength: validators.minLength(10),
            maxLength: validators.maxLength(20)
        },
        gender: {
            required: validators.required,
            isIn: validators.isIn(Object.values(EInfoGender))

        },
        email: {
            email: validators.email
        },
        dni: {
            minLength: validators.minLength(10),
            maxLength: validators.maxLength(20)
        },
        note: {
            minLength: validators.minLength(0),
            maxLength: validators.maxLength(250)
        },
        provinceId: {
            required: validators.required,
            maxLength: validators.maxLength(75)
        },
        municipeId: {
            required: validators.required,
            maxLength: validators.maxLength(75)
        },
        line1: {
            required: validators.required,
            maxLength: validators.maxLength(120)
        },
        line2: {
            maxLength: validators.maxLength(120)
        }
    }))

    const $vPatient = computed(() => getValidation(patientValidation, patient.value))

    return {
        $vPatient,
        getValidation,
        runFromValidation
    }
}