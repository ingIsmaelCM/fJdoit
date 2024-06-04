<template>
  <TableWrapper :key="key" title="Planes Activos" :data="plans" :query="query" :formatter="planFormatter"
                :method="getPlans">
    <template #after>
      <el-table-column :width="95" fixed="right" label="Acciones">
        <template #default="{ row }">
          <div class="flex justify-end items-center space-x-2 py-1 ">
            <template v-if="!row.deletedAt">
              <PlanDetail :plan="row">
                <template #addNew>
                  <AddNewFood :day="row.day" :plan-id="row.id" :plan="row" :lockday="true"/>
                </template>
              </PlanDetail>
              <EditFoodPlan :foodPlans="row.planfoods" :plan="row" @updatedPlanFood="getPlans"/>
              <el-popconfirm width="300" title="¿Desea eliminar este registro?">
                <template #reference>
                  <button class="  !bg-transparent   !border-none" circle title="Eliminar">
                    <Icon icon="carbon:trash-can" class="text-lg text-red-300"/>
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
import {useGetPlans, useSetPlanFood} from "@/services/plans";
import EditFoodPlan from "@/components/plans/EditFoodPlan.vue";
import AddNewFood from "@/components/plans/AddNewFood.vue";
import emitter from "@/helpers/emitter.ts";
import {onBeforeMount, onMounted, onUnmounted, ref} from "vue";
import utils from "@/helpers/utils.ts";
import PlanDetail from "@/components/plans/PlanDetail.vue";
import {useRoute} from "vue-router";

const {plans, query, planFormatter, getPlans} = useGetPlans();
const key = ref(0);
const {createPlanFood} = useSetPlanFood(() => {
})
const route = useRoute();

const showError = (message: string) => {
  utils.showNoti({
    type: "error",
    title: "No se pudo añadir",
    message: message,
    position: "bottom-right",
    duration: 3500
  })
}

onMounted(() => {
  emitter.on("addDiet", async ({newFood, plan}: any) => {
    if (plan.planfoods.some((pf: any) => pf.foodId === newFood.id)) {
      showError("Este alimento ya está incluido");
    } else if (plan.planfoods.length >= 5) {
      showError("Ingrese 5 alimentos o menos por plan");
    } else {
      createPlanFood({
        portion: newFood.portion,
        foodId: newFood.id,
        planId: plan.id
      }).then(async () => {
        await getPlans()
        key.value++
      })

    }

  });
});


onBeforeMount(() => {
  const {query: routeQuery} = route;
  if (routeQuery.type) {
    query.replaceFilter("type", routeQuery.type, "eq", "and")
  }
})

onUnmounted(() => {
  emitter.off("addDiet")
})
</script>
