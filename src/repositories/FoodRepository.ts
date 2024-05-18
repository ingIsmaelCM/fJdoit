import BaseRepository from "@/repositories/BaseRepository.ts";
import {IFoodView} from "@/interfaces/ModelInterfaces.ts";

export  default  class FoodRepository extends  BaseRepository<IFoodView>{
    endpoint="foods"
}