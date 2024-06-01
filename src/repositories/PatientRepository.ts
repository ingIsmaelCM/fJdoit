import BaseRepository from "@/repositories/BaseRepository.ts";
import {IPatient} from "@/interfaces/ModelInterfaces.ts";

export default class PatientRepository extends BaseRepository<IPatient> {
    endpoint = "patients"
}