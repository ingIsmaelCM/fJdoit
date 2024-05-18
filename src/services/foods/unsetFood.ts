import FoodRepository from "@/repositories/FoodRepository.ts";
import {ref} from "vue";

export  function  useUnsetFood(){
    const foodRepo = new FoodRepository();
    const key=ref(0);

    const deleteFood=async(foodId:string)=>{
        await foodRepo.delete(foodId);
        key.value++;
    }

    const restoreFood=async(foodId:string)=>{
        await foodRepo.restore(foodId);
        key.value++;
    }

    return{
        key,
        deleteFood,
        restoreFood

    }
}