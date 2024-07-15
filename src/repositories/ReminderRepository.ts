import BaseRepository from "@/repositories/BaseRepository.ts";
import {IReminder} from "@/interfaces/ModelInterfaces.ts";

export default class ReminderRepository extends BaseRepository<IReminder> {
    endpoint = "reminders"
}