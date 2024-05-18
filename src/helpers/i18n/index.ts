import { createI18n } from 'vue-i18n'

const messages = {
    en: {
        validation: {
            required: 'This field is required.',
            email: 'Please enter a valid email address.',
            minLength: 'This field must be at least {min} characters long.',
            maxLength: 'This field must be no more than {max} characters long.',
            minValue: 'This field must be at least {min}.',
            maxValue: 'This field must be no more than {max}.'
        }
    },
    es: {
        validation: {
            required: 'Este campo es obligatorio.',
            email: 'Ingrese un correo electrónico válido.',
            minLength: 'Debe tener al menos  {min} caracteres.',
            maxLength: 'Debe tener como máximo {max} caracteres.',
            minValue: `Debe ser mayor o igual a {min}.`,
            maxValue: 'Debe ser menor o igual a {max}'
        }
    }
}

export const i18n = createI18n({
    locale: 'es',
    messages
})