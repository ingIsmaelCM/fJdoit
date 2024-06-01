import BaseRepository from "@/repositories/BaseRepository.ts";
import {IProvince} from "@/interfaces/ModelInterfaces.ts";

export default class ProvinceRepository extends BaseRepository<IProvince> {
    endpoint = "provinces"
}