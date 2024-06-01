import {ref} from "vue";
import CategoryRepository from "@/repositories/CategoryRepository.ts";

export function useUnsetCategory() {
    const catRepo = new CategoryRepository();
    const key = ref(0)

    const deleteCategory = async (catId: string) => {
        catRepo.delete(catId).then(() => {
            key.value++;
        })
    }
    const restoreCategory = async (catId: string) => {
        catRepo.restore(catId).then(() => {
            key.value++;
        })
    }
    return {
        key,
        deleteCategory,
        restoreCategory
    }
}