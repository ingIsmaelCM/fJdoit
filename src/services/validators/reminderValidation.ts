import {computed, Ref} from "vue";
import {IReminder} from "@/interfaces/ModelInterfaces.ts";
import {useValidation} from "@/helpers/validation.ts";
import {validators} from "@/helpers/i18n/validators.ts";

const {getValidation, runFromValidation} = useValidation();

export function useCreateReminderValidation(reminder: Ref<IReminder>) {


    const reminderValidation = computed(() => ({
        title: {
            required: validators.required
        },
        description: {
            required: validators.required
        },
        type: {
            required: validators.required
        }
    }));

    const $vReminder = computed(() => getValidation(reminderValidation, reminder.value));

    return {
        $vReminder, runFromValidation
    }
}