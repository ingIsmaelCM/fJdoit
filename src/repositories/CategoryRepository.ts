import BaseRepository from "@/repositories/BaseRepository.ts";
import {ICategory} from "@/interfaces/ModelInterfaces.ts";

export default class CategoryRepository extends BaseRepository<ICategory> {
    endpoint = "categories"
}