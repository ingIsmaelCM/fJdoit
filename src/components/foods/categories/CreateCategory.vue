<template>
  <CustomDialog title="Registrar Categoría"  class="!w-96" :key="key">
    <template #button>
      <Button severity="contrast" title="Nueva Categoría">
        <Icon icon="ic:twotone-playlist-add" class="text-2xl"/>
      </Button>
    </template>
    <form @submit.prevent="(evt:any)=>onConfirmSubmit(evt, '¿Confirma que desea guardar el registro?',
  createCategory)" class="grid grid-cols-3 gap-x-4 gap-y-8 mt-8">
      <FloatLabel class="col-span-2">
        <AutoComplete id="name" class="w-full dark:bg-gray-700" v-model="category.name"  inputClass="  !w-full dark:bg-gray-700"
                      :suggestions="categories.map((cat:any)=>cat.name)" :invalid="$vCategory.name?.$error"
                      @complete="search"/>
        <label for="name">Nombre</label>
      </FloatLabel>
      <Button type="submit" severity="contrast"
              class="bg-soft hover:bg-opacity-80 text-gray-200 col-span-1"
              raised label="Registrar"/>
      <input type="submit" value="" class="hidden">
    </form>
  </CustomDialog>
</template>

<script setup lang="ts">
import {useGetCategories, useSetCategory} from "@/services/foods";
import useConfirmService from "@/services/ConfirmService.ts";


const emit = defineEmits(["categoryCreated"])
const {category, $vCategory, key, createCategory} = useSetCategory(emit);
const {categories, query, getCategories} = useGetCategories();
const {onConfirmSubmit} = useConfirmService();
const search = async (evt: any) => {
  query.search(evt.query);
  await getCategories();
}
</script>