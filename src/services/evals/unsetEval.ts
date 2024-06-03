import EvalRepository from "@/repositories/EvalRepository.ts";
import {ref} from "vue";

export  function  useUnsetEval(){
    const evalRepo = new EvalRepository();
    const key=ref(0);

    const deleteEval=async(evalId: string)=>{
        evalRepo.delete(evalId).then(()=>{
            key.value++
        })
    }

    const restoreEval=async(evalId: string)=>{
        evalRepo.restore(evalId).then(()=>{
            key.value++
        })
    }

    return{
        key,
        deleteEval,
        restoreEval
    }
}