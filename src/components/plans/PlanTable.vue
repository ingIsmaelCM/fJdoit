<template>
  <TableWrapper title="Planes Activos" :data="plans" :query="query" :formatter="planFormatter" :method="getPlans">
    <template #after>
      <el-table-column :width="90" fixed="right" label="Acciones">
        <template #default="{ row }">
          <div class="flex justify-end items-center space-x-2 py-1 ">
            <template v-if="!row.deletedAt">
              <FoodDetail :food="row"/>
              <EditFoodPlan :foodPlans="row.foodPlan" @updatedPlanFood="getPlans" />
              <el-popconfirm width="300" title="¿Desea eliminar este registro?">
                <template #reference>
                  <button class="  !bg-transparent   !border-none" circle title="Eliminar">
                    <Icon icon="carbon:trash-can" class="text-lg"/>
                  </button>
                </template>
              </el-popconfirm>
            </template>
            <el-popconfirm width="300" title="¿Desea restaurar este registro?" v-else>
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
</template>

<script setup lang="ts">

import {useGetPlans} from "@/services/plans";
import FoodDetail from "@/components/foods/FoodDetail.vue";
import EditFood from "@/components/foods/EditFood.vue";
import EditFoodPlan from "@/components/plans/EditFoodPlan.vue";

const {plans, query, planFormatter, getPlans} = useGetPlans();
</script>
