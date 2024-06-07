<template>
  <div class="p-2">
    <TableWrapper :key="'foodTable'+key" :data="foods" :query="query" :formatter="foodFormatter" :method="getFoods"
                  title="Tabla alimenticia" :has-trash="true">
      <template #addButton>
        <CreateFood @foodCreated="getFoods"/>
      </template>
      <template #after>
        <el-table-column :width="110" fixed="right" label="Acciones">
          <template #default="{ row }">
            <div class="flex justify-end items-center space-x-2 ">
              <template v-if="!row.deletedAt">
                <FoodDetail :food="row"/>
                <el-popconfirm width="300" title="¿Desea eliminar este registro?" @confirm="()=>deleteFood(row.id)">
                  <template #reference>
                    <button class="  !bg-transparent   !border-none" circle title="Eliminar">
                      <Icon icon="carbon:trash-can" class="text-lg"/>
                    </button>
                  </template>
                </el-popconfirm>
                <EditFood :prev-food="row" @foodUpdated="getFoods"/>
              </template>
              <el-popconfirm width="300" title="¿Desea restaurar este registro?" @confirm="()=>restoreFood(row.id)"
                             v-else>
                <template #reference>
                  <button class="  !bg-transparent   !border-none" circle title="Restaurar">
                    <Icon icon="material-symbols:settings-backup-restore-rounded"
                          class="text-lg"/>
                  </button>
                </template>
              </el-popconfirm>


            </div>
          </template>
        </el-table-column>
      </template>
    </TableWrapper>
  </div>


</template>
<script setup lang="ts">

import QueryService from "@/services/QueryService.ts";
import {useGetFoods, useUnsetFood} from "@/services/foods";
import EditFood from "@/components/foods/EditFood.vue";
import {onBeforeMount} from "vue";
import CreateFood from "@/components/foods/CreateFood.vue";
import FoodDetail from "@/components/foods/FoodDetail.vue";

interface IProps {
  onQuery?: (query: QueryService) => void
}

const props = defineProps<IProps>()
const {foods, query, foodFormatter, getFoods,} = useGetFoods();
const {key, deleteFood, restoreFood} = useUnsetFood();

onBeforeMount(() => {
  props.onQuery && props.onQuery(query);
});
</script>