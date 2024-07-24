import ReminderRepository from "@/repositories/ReminderRepository.ts";
import ReminderFormatter from "@/formatter/ReminderFormatter.ts";
import QueryService from "@/services/QueryService.ts";
import {ref, Ref} from "vue";
import {IReminder} from "@/interfaces/ModelInterfaces.ts";
import {AxiosResponse} from "axios";

export function useGetReminder() {
    const reminderRepo = new ReminderRepository();
    const reminderFormatter = new ReminderFormatter();
    const query = new QueryService();
    const reminders: Ref<IReminder[]> = ref([]);
    const reminder: Ref<IReminder> = ref(reminderFormatter.init());

    query.page(1).perpage(15).include("patient")
    const getReminders = async () => {
        await reminderRepo.get(query.parsed.value).then(({data}: AxiosResponse) => {
            reminders.value = data.rows;
            query.setPagination(data);

        })
    }

    return {
        reminder,
        reminders,
        reminderFormatter,
        query,
        getReminders,

    }
}