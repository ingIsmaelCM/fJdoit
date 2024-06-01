import ProvinceRepository from "@/repositories/ProvinceRepository.ts";
import ProvinceFormatter from "@/formatter/ProvinceFormatter.ts";
import QueryService from "@/services/QueryService.ts";
import {ref, Ref} from "vue";
import {IProvince} from "@/interfaces/ModelInterfaces.ts";

export function useGetProvinces() {
    const provinceRepo = new ProvinceRepository();
    const provinceFormatter = new ProvinceFormatter();
    const query = new QueryService();
    const provinces: Ref<IProvince[]> = ref([]);
    const province: Ref<IProvince> = ref(provinceFormatter.init())

    query.limit(100).include("municipes");

    const getProvinces = async () => {
       await provinceRepo.get(query.parsed.value).then(({data}) => {
            provinces.value = data.rows;
        })
    }

    return {
        provinces,
        province,
        provinceFormatter,
        query,
        getProvinces
    }
}