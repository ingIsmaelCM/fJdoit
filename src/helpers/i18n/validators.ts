import {required, email, minLength, maxLength, minValue, maxValue} from '@vuelidate/validators'
import {createI18nMessage} from '@vuelidate/validators'
import {i18n} from "@/helpers/i18n/index.ts";


const {t} = i18n.global

const withI18nMessage = createI18nMessage({
    t,
    messagePath: ({$validator}) => `validation.${$validator}`
})

export const validators = {
    required: withI18nMessage(required),
    email: withI18nMessage(email),
    minLength: (length: number) => withI18nMessage(minLength(length), {params: {length},}),
    maxLength: (length: number) => withI18nMessage(maxLength(length), {params: {length}}),
    minValue: (value: number) => withI18nMessage(minValue(value), {params: {value}}),
    maxValue: (value: number) => withI18nMessage(maxValue(value), {params: value})
}