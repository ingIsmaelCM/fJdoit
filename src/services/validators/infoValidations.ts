import {validators} from "@/helpers/i18n/validators.ts";
import {EInfoGender} from "@/interfaces/ModelInterfaces.ts";


export default {
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
}