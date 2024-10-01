import ReminderRepository from "@/repositories/ReminderRepository.ts";
import ReminderFormatter from "@/formatter/ReminderFormatter.ts";
import {ref, Ref} from "vue";
import {EReminderStatus, IReminder} from "@/interfaces/ModelInterfaces.ts";
import {useCreateReminderValidation, useReprogramReminderValidation} from "@/services/validators/reminderValidation.ts";
import moment from "moment-timezone";
import {EAxiosVerb} from "@/interfaces/AppInterfaces.ts";


export function useSetReminder(emit?: (arg: string) => void) {
    const reminderRepo = new ReminderRepository();
    const reminderFormatter = new ReminderFormatter();
    const reminder: Ref<IReminder> = ref(reminderFormatter.init());
    const {runFromValidation, $vReminder} = useCreateReminderValidation(reminder)
    const {$vReminder: $vReprogramReminder} = useReprogramReminderValidation(reminder)
    const moveDateOnReprogram = ref(false)

    function formattReminder() {
       return{
            ...reminder.value,
            day: reminder.value.day && moment(reminder.value.day).format("D-MM"),
            time: reminder.value.time && moment(reminder.value.time).format("H:mm"),
            status: EReminderStatus.pending,
            tags: (reminder.value.tags && reminder.value.tags.length > 0) ? reminder.value.tags.join(",") : null
        }
    }

    const createReminder = async () => {
        await runFromValidation($vReminder.value, async () => {
            const newData = formattReminder();
            await reminderRepo.save(newData);
            reminder.value = reminderFormatter.init();
            emit && emit("reminderCreated")
        })
    }

    const reprogramReminder = async (reminderId: string) => {

        await runFromValidation($vReprogramReminder.value, async () => {
            const newData = {...formattReminder(), moveDate: moveDateOnReprogram.value};
            await reminderRepo.custom(`reminders/${reminderId}/reprogram`, EAxiosVerb.Put, newData);
            emit && emit("reminderReprogrammed")
        })
    }

    const updateReminder = async () => {
        await runFromValidation($vReminder.value, async () => {
            const newData = formattReminder();
            await reminderRepo.update(newData.id, newData);
            emit && emit("reminderUpdated")
        })
    }

    const changeStatus = async (reminderId: string, status: EReminderStatus) => {
        await reminderRepo.custom(`reminders/${reminderId}/status`, EAxiosVerb.Put,
            {
                status
            });
    }

    return {
        reminder,
        moveDateOnReprogram,
        $vReminder: $vReminder.value,
        $vReprogramReminder: $vReprogramReminder.value,
        createReminder,
        updateReminder,
        reprogramReminder,
        changeStatus
    }
}