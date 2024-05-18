<template>
  <div class="p-2 grid grid-cols-10 h-full gap-x-4">
    <div class="col-span-4  h-full shadow-xl rounded-xl ">
      <h1 class="col-span-10 text-lg font-bold uppercase text-soft p-4 mt-2">Registro de alimentos</h1>
      <FoodForm @onCategorySelect="(arg:string)=>categoryId=arg"/>
    </div>
    <div class="col-span-6 h-full shadow-xl rounded-x grid grid-cols-1 justify-center items-center">
      <FoodTable v-if="categoryId" :key="categoryId" :on-query="queryFromCategory"/>
      <h1 v-else class="font-bold text-xl uppercase mx-8 text-center">Seleccione una categoría para ver sus
        registros</h1>
    </div>
  </div>


</template>
<script setup lang="ts">
import FoodTable from "@/components/foods/FoodTable.vue";
import QueryService from "@/services/QueryService.ts";
import FoodForm from "@/components/foods/FoodForm.vue";
import {ref} from "vue";

const categoryId = ref("");
const queryFromCategory = (query: QueryService) => {
  query.filter("categoryId", categoryId.value, "eq", "and")
      .perpage(25)
}


</script>