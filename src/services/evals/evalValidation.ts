import {useValidation} from "@/helpers/validation.ts";
import {computed, ComputedRef} from "vue";
import {validators} from "@/helpers/i18n/validators.ts";


const {getValidation, runFromValidation} =useValidation();

export function  useCreateEvalValidation(evaluation: ComputedRef<any>){

    const evalRule=computed(()=>({
        weight:{
            required: validators.required,
            minValue: validators.minValue(1),
            maxValue: validators.maxValue(250)
        },
        height:{
            required: validators.required,
            minValue: validators.minValue(1),
            maxValue: validators.maxValue(250)
        },
        note: {
            required: validators.required,
            minValue: validators.minLength(5),
            maxLength: validators.maxLength(255)
        },
        patientId: {
            required: validators.required,
            minValue: validators.minLength(5),
            maxLength: validators.maxLength(75)
        }
    }))

    const $vEval=computed(()=>getValidation(evalRule, evaluation.value ))

    return{
        $vEval,
        runFromValidation
    }
}