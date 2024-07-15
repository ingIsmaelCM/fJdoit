import CategoryRepository from "@/repositories/CategoryRepository.ts";
import CategoryFormatter from "@/formatter/CategoryFormatter.ts";
import {computed, ref, Ref} from "vue";
import {ICategory} from "@/interfaces/ModelInterfaces.ts";
import {useCategoryValidation} from "@/services/validators/categoryValidation.ts";

export function useSetCategory(emit: Function) {
    const categoryRepo = new CategoryRepository();
    const categoryFormatter = new CategoryFormatter();
    const category: Ref<ICategory> = ref(categoryFormatter.init());
    const {categoryRules, getValidation, runFromValidation} = useCategoryValidation();
    const key=ref(0)

    const $vCategory = computed(() => getValidation(categoryRules, category.value))

    const createCategory = async () => {
        await runFromValidation($vCategory.value, async () => {
            categoryRepo.save(category.value).then(() => {
                emit("categoryCreated");
                key.value++;
            })
        })
    }

    const updateCategory = async () => {
        await runFromValidation($vCategory.value, async () => {
            categoryRepo.update(category.value.id, category.value).then(() => {
                emit("categoryUpdated");
                key.value++;
            })
        })
    }


    return {
        category,
        key,
        $vCategory: $vCategory.value,
        createCategory,
        updateCategory
    }
}