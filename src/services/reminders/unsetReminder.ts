import {ref} from "vue";
import ReminderRepository from "@/repositories/ReminderRepository.ts";

export  function useUnsetReminder(){
    const reminderRepo=new ReminderRepository();
    const id=ref(0);

    const deleteReminder=async(reminderId: string)=>{
        reminderRepo.delete(reminderId).then((res)=>{
            id.value++;
        })
    }


    return {
        id,
        deleteReminder
    }
}