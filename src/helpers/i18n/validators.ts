import {required, email, minLength, maxLength, minValue, maxValue, helpers, requiredIf, } from '@vuelidate/validators'
import {createI18nMessage} from '@vuelidate/validators'
import {i18n} from "@/helpers/i18n/index.ts";


const {t} = i18n.global

const withI18nMessage = createI18nMessage({
    t,
    messagePath: ({$validator}) => `validation.${$validator}`
})
export const isIn = (options: any[]) => (value: any) => !helpers.req(value) || options.includes(value)
const isRegex = (expression: RegExp) => (value: any) => Boolean(value && value.match(expression))

export const validators = {
    required: withI18nMessage(required),
    requiredIf: withI18nMessage(requiredIf),
    email: withI18nMessage(email),
    minLength: (length: number) => withI18nMessage(minLength(length)),
    maxLength: (length: number) => withI18nMessage(maxLength(length)),
    minValue: (value: number) => withI18nMessage(minValue(value)),
    maxValue: (value: number) => withI18nMessage(maxValue(value)),
    isIn: (options: any[]) => withI18nMessage(isIn(options)),
    isRegex: (expression: RegExp) => withI18nMessage(isRegex(expression))
}