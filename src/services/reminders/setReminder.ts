import ReminderRepository from "@/repositories/ReminderRepository.ts";
import ReminderFormatter from "@/formatter/ReminderFormatter.ts";
import {ref, Ref} from "vue";
import {EReminderStatus, IReminder} from "@/interfaces/ModelInterfaces.ts";
import {useCreateReminderValidation} from "@/services/validators/reminderValidation.ts";
import moment from "moment-timezone";
import {EAxiosVerb} from "@/interfaces/AppInterfaces.ts";


export function useSetReminder() {
    const reminderRepo = new ReminderRepository();
    const reminderFormatter = new ReminderFormatter();
    const reminder: Ref<IReminder> = ref(reminderFormatter.init());

    const days = ref([
        {index: 0, name: "Domingo"},
        {index: 1, name: "Lunes"},
        {index: 2, name: "Martes"},
        {index: 3, name: "Miércoles"},
        {index: 4, name: "Jueves"},
        {index: 5, name: "Viernes"},
        {index: 6, name: "Sábado"},
    ])

    const {runFromValidation, $vReminder} = useCreateReminderValidation(reminder)

    const createReminder = async () => {
        await runFromValidation($vReminder.value, async () => {
            const newData = {
                ...reminder.value,
                day: reminder.value.day && moment(reminder.value.day).format("D-M"),
                time: reminder.value.time && moment(reminder.value.time).format("H:m"),
                status: EReminderStatus.pending
            }
            await reminderRepo.save(newData);
            reminder.value = reminderFormatter.init();
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
        days,
        $vReminder: $vReminder.value,
        createReminder,
        changeStatus
    }
}