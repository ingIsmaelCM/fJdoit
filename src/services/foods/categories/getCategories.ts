import {ref, Ref} from "vue";
import {ICategory} from "@/interfaces/ModelInterfaces.ts";
import CategoryFormatter from "@/formatter/CategoryFormatter.ts";
import CategoryRepository from "@/repositories/CategoryRepository.ts";
import QueryService from "@/services/QueryService.ts";

export  function  useGetCategories(){
    const query=new QueryService();
    const categoryFormatter=new CategoryFormatter();
    const categoryRepo=new CategoryRepository();
    const categories:Ref<ICategory[]>=ref([]);
    const category: Ref<ICategory>=ref(categoryFormatter.init());

    query.page(1).perpage(15).order("name")
    const getCategories=async()=>{
        const {data}=await categoryRepo.get(query.parsed.value);
        categories.value=data.rows;
        query.setPagination(data);
    }

    return {
        categories,
        category,
        query,
        categoryFormatter,
        getCategories
    }
}