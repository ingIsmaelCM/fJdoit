import QueryService from "@/services/QueryService.ts";
import PlanFormatter from "@/formatter/PlanFormatter.ts";
import PlanRepository from "@/repositories/PlanRepository.ts";
import {ref, Ref} from "vue";
import { IPlanView} from "@/interfaces/ModelInterfaces.ts";
import {AxiosResponse} from "axios";

export  function  useGetPlans(){
    const query=new  QueryService();
    const planFormatter=new PlanFormatter();
    const planRepo=new PlanRepository();
    const plans:Ref<IPlanView[]>=ref([]);
    const plan: Ref<IPlanView>=ref(planFormatter.init());

    query.perpage(15).page(1).include("nutrient,patient,planfoods.food.nutrient");

    const getPlans=async ()=>{
        const {data}:AxiosResponse= await planRepo.get(query.parsed.value)
            plans.value=data.rows;
            query.setPagination(data)
    }

    return{
        plans,
        plan,
        query,
        planFormatter,
        getPlans
    }
}