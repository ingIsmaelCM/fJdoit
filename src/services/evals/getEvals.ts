import EvalRepository from "@/repositories/EvalRepository.ts";
import EvalFormatter from "@/formatter/EvalFormatter.ts";
import QueryService from "@/services/QueryService.ts";
import {ref} from "vue";
import {AxiosResponse} from "axios";

export function useGetEvals() {
    const evalRepo = new EvalRepository();
    const evalFormatter = new EvalFormatter();
    const query = new QueryService();
    const evals = ref([]);
    const evaluation = ref(evalFormatter.init())

    query.page(1).perpage(15).order("createdAt").include("patient")
    const getEvals = async () => {
        evalRepo.get(query.parsed.value).then(({data}: AxiosResponse) => {
            evals.value = data.rows;
            query.setPagination(data)
        })
    }

    return {
        evals,
        evaluation,
        evalFormatter,
        query,
        getEvals
    }
}