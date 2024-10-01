import {ref} from "vue";
import ReminderRepository from "@/repositories/ReminderRepository.ts";

export  function useUnsetReminder(){
    const reminderRepo=new ReminderRepository();
    const key=ref(0);

    const deleteReminder=async(reminderId: string)=>{
        reminderRepo.delete(reminderId).then(()=>{
            key.value++;
        })
    }


    return {
        key,
        deleteReminder
    }
}