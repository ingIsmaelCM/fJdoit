import BaseRepository from "@/repositories/BaseRepository.ts";
import {IPlan} from "@/interfaces/ModelInterfaces.ts";

export default class PlanRepository extends BaseRepository<IPlan> {
    endpoint = "plans"
}