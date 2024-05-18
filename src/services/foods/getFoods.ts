import FoodFormatter from "@/formatter/FoodFormatter.ts";
import FoodRepository from "@/repositories/FoodRepository.ts";
import QueryService from "@/services/QueryService.ts";
import {Ref, ref} from "vue";
import {IFoodView} from "@/interfaces/ModelInterfaces.ts";

export function useGetFoods() {
    const foodFormatter = new FoodFormatter();
    const foodRepo = new FoodRepository();
    const query = new QueryService();
    const food: Ref<IFoodView> = ref(foodFormatter.init());
    const foods: Ref<IFoodView[]> = ref([]);

    query.page(1).perpage(15).order("name");

    const getFoods = async () => {
        const {data} = await foodRepo.get(query.parsed.value);
        foods.value = data.rows;
        query.setPagination(data);
    }

    return {
        food,
        foods,
        query,
        foodFormatter,
        getFoods
    }
}