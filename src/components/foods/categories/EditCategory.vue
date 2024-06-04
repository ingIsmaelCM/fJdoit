<template>
  <CustomDialog title="Editar Categoría" @show="initCat" @hide="$emit('categoryUpdated')" :key="key">
    <template #button>
      <button severity="contrast" title="Actualizar Categoría" class="py-1">
        <Icon icon="carbon:edit" class="text-xl"/>
      </button>
    </template>
    <form @submit.prevent="(evt:any)=>onConfirmSubmit(evt, '¿Confirma que desea editar el registro?',
  updateCategory)" class="grid grid-cols-3 gap-x-4 gap-y-8 mt-8">
      <FloatLabel class="col-span-2">
        <AutoComplete id="name" class="w-full dark:bg-gray-700" v-model="category.name"
                      inputClass="  !w-full dark:bg-gray-700"
                      :suggestions="categories.map((cat:any)=>cat.name)" :invalid="$vCategory.name?.$error"
                      @complete="search"/>
        <label for="name">Nombre</label>
      </FloatLabel>
      <Button type="submit" severity="contrast"
              class="bg-soft hover:bg-opacity-80 text-gray-200 col-span-1"
              raised label="Actualizar"/>
      <input type="submit" value="" class="hidden">
    </form>
  </CustomDialog>
</template>

<script setup lang="ts">
import {useGetCategories, useSetCategory} from "@/services/foods";
import useConfirmService from "@/services/ConfirmService.ts";
import {ICategory} from "@/interfaces/ModelInterfaces.ts";

interface IProps {
  prevCat: ICategory
}

const props = defineProps<IProps>();
const emit = defineEmits(["categoryUpdated"])
const {category, $vCategory, key, updateCategory} = useSetCategory(emit);
const {categories, query, getCategories} = useGetCategories();
const {onConfirmSubmit} = useConfirmService();
const search = async (evt: any) => {
  query.search(evt.query);
  await getCategories();
}

const initCat = () => {
  category.value = props.prevCat;
}

</script>