import BaseRepository from "@/repositories/BaseRepository.ts";
import {IEval} from "@/interfaces/ModelInterfaces.ts";

export default class EvalRepository extends BaseRepository<IEval> {
    endpoint = "evals"
}