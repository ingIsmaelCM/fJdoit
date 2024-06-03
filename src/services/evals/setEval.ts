import EvalRepository from "@/repositories/EvalRepository.ts";
import EvalFormatter from "@/formatter/EvalFormatter.ts";
import {ref} from "vue";
import {useCreateEvalValidation} from "@/services/evals/evalValidation.ts";

export function useSetEval(emit: Function) {
    const evalRepo = new EvalRepository();
    const evalFormatter = new EvalFormatter();
    const evaluation = ref(evalFormatter.init())

    const {runFromValidation, $vEval} = useCreateEvalValidation(evaluation)

    const createEval = async () => {
        runFromValidation($vEval.value, async () => {
            evalRepo.save(evaluation.value).then(()=>{
                emit("updateEval")
            })
        }).then()
    }
    const updateEval = async () => {
        runFromValidation($vEval.value, async () => {
            evalRepo.update(evaluation.value.id, evaluation.value).then(()=>{
                emit("updateEval")
            })
        }).then()
    }
    return {
        evaluation,
        $vEval: $vEval.value,
        createEval,
        updateEval
    }
}