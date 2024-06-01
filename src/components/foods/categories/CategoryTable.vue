<template>
  <div class="p-2 grid grid-cols-10 h-full gap-x-4">
    <div class="col-span-3 pt-5 shadow-xl rounded-xl ">
      <TableWrapper :title="true" :data="categories" :query="query" height="100%" :key="key" :has-trash="true"
                    :method="getCategories" :formatter="categoryFormatter" :hide-filters="true">
        <template #addButton>
          <CreateCategory @categoryCreated="getCategories"/>
        </template>
        <template #after>
          <el-table-column :width="90" fixed="right" label="Acciones">
            <template #default="{ row }">
              <div class="flex justify-end items-center space-x-2 ">
                <template v-if="!row.deletedAt">
                  <EditCategory :prev-cat="row" @categoryUpdated="getCategories" />
                  <button class="  !bg-transparent   !border-none" circle title="Detalles" @click="categoryId=row.id">
                    <Icon icon="carbon:touch-1" class="text-lg"/>
                  </button>
                  <el-popconfirm width="200" title="¿Eliminar categoría?" @confirm="()=>deleteCategory(row.id)">
                    <template #reference>
                      <button class="  !bg-transparent   !border-none" circle v-tooltip.top="'Eliminar'">
                        <Icon icon="carbon:trash-can" class="text-lg"/>
                      </button>
                    </template>
                  </el-popconfirm>
                </template>
                <el-popconfirm width="200" title="¿Restablecer categoría?" @confirm="()=>restoreCategory(row.id)"
                               v-else>
                  <template #reference>
                    <button class="  !bg-transparent   !border-none" circle v-tooltip.top="'Restaurar'">
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
    <div class="col-span-7 h-full shadow-xl rounded-xl grid grid-cols-1 justify-center items-center">
      <FoodTable v-if="categoryId" :key="categoryId" :on-query="queryFromCategory"/>
      <h1 v-else class="font-bold text-xl uppercase mx-8 text-center">Seleccione una categoría para ver sus
        registros</h1>
    </div>
  </div>


</template>
<script setup lang="ts">
import FoodTable from "@/components/foods/FoodTable.vue";
import QueryService from "@/services/QueryService.ts";
import {ref} from "vue";
import {useGetCategories, useUnsetCategory} from "@/services/foods";
import CreateCategory from "@/components/foods/categories/CreateCategory.vue";
import EditCategory from "@/components/foods/categories/EditCategory.vue";

const {categories, categoryFormatter, query, getCategories} = useGetCategories();
const {key, deleteCategory, restoreCategory} = useUnsetCategory();

const categoryId = ref("");
const queryFromCategory = (query: QueryService) => {
  query.filter("categoryId", categoryId.value, "eq", "and")
      .perpage(25)
}


</script>