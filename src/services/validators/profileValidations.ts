import {useValidation} from "@/helpers/validation.ts";
import {computed, Ref} from "vue";
import {IUserView} from "@/interfaces/ModelInterfaces.ts";
import {validators} from "@/helpers/i18n/validators.ts";
import infoValidations from "@/services/validators/infoValidations.ts";

const {getValidation, runFromValidation} = useValidation();

export function useUpdateProfileValidator(user: Ref<IUserView>) {

    const profileValidation = computed(() => ({
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
        ...infoValidations
    }))

    const $vProfile = computed(() => getValidation(profileValidation, user.value));

    return {
        $vProfile,
        runFromValidation
    }
}

export function useChangePasswordValidation(user: Ref<any>) {
    const passwordValidation = computed(() => ({
        password: {
            required: validators.required,
            minLength: validators.minLength(8),
        },
        password_confirmation: {
            required: validators.required,
            minLength: validators.minLength(8),
        }
    }))

    const $vPassword = computed(() => getValidation(passwordValidation, user.value));
    return {
        passwordValidation, $vPassword
    }
}