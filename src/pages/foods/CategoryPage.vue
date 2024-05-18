<template>
  <div class="p-2 grid grid-cols-10 h-full gap-x-4">
    <div class="col-span-3 pt-7  h-full shadow-xl rounded-xl ">
      <TableWrapper title="Grupos alimenticios" :data="categories" :query="query"
                    :method="getCategories" :formatter="categoryFormatter">
        <template #after>
          <el-table-column :width="90" fixed="right" label="Acciones">
            <template #default="{ row }">
              <div class="flex justify-end items-center space-x-2 ">
                <template v-if="!row.deletedAt">
                  <button class="  !bg-transparent   !border-none" circle title="Detalles" @click="categoryId=row.id">
                    <Icon icon="carbon:touch-1" class="text-lg"/>
                  </button>
                  <el-popconfirm title="¿Eliminar?">
                    <template #reference>
                      <button class="  !bg-transparent   !border-none" circle title="Restaurar">
                        <Icon icon="carbon:trash-can" class="text-lg"/>
                      </button>
                    </template>
                  </el-popconfirm>
                </template>
                <el-popconfirm title="¿Restablecer?" v-else>
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
import {useGetCategories} from "@/services/foods";
import EditFood from "@/components/foods/EditFood.vue";


const {categories, categoryFormatter, query, getCategories} = useGetCategories();

const categoryId = ref("");
const queryFromCategory = (query: QueryService) => {
  query.filter("categoryId", categoryId.value, "eq", "and")
      .perpage(25)
}


</script>