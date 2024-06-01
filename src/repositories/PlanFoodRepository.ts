import BaseRepository from "@/repositories/BaseRepository.ts";
import {IPlanFood} from "@/interfaces/ModelInterfaces.ts";

export default class PlanFoodRepository extends BaseRepository<IPlanFood> {
    endpoint = "planfoods"
}