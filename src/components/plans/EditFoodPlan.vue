<template>
  <CustomDialog title="Actualizar Alimentos del Plan" @show="initData"
                class="!w-[500px]" :key="key" @close="$emit('updatedPlanFood')">
    <template #button>
      <button severity="contrast" title="Actualizar paciente">
        <Icon icon="carbon:edit" class="text-lg"/>
      </button>
    </template>
    <div class="grid grid-cols-12 gap-x-2 gap-y-8 pt-6">
      <template v-for="foodPlan in foodPlans" :key="foodPlan.id">
        <FloatLabel class="col-span-2">
          <InputNumber inputClass="!w-full dark:bg-gray-700" class="!w-full !px-0" :id="`portion${foodPlan.id}`"
                       v-model="foodPlan.portion" :min="0.5" :max="2.5" :allowEmpty="false" locale="en-US"
                       mode="decimal" :min-fraction-digits="2" :max-fraction-digits="2"/>
          <label :for="`portion${foodPlan.id}`">Porción</label>
        </FloatLabel>
        <FloatLabel class="col-span-8">
          <Dropdown :id="`foodId${foodPlan.id}`" v-model="foodPlan.foodId" :options="foods" option-label="name"
                    option-value="id"
                    filter @filter="(evt:any)=>$debounce(()=>onSearchFood(evt),500)(evt)" :auto-filter-focus="true"
                    inputClass="!w-full" class="!w-full dark:bg-gray-700 hide-arrow" panelClass="dark:bg-gray-800"/>
          <label :for="`foodId${foodPlan.id}`"><sup class="text-red-400">*</sup>Alimento</label>
        </FloatLabel>
        <el-popconfirm :width="250" title="¿Deseas actualizar este registro?" @confirm="()=>updateFoodPlan(foodPlan)">
          <template #reference>
            <Button type="button" severity="contrast" rounded
                    class=""
                    raised>
              <template #icon>
                <Icon icon="material-symbols:save-as-outline" class="text-2xl text-primary hover:text-soft"/>
              </template>
            </Button>
          </template>
        </el-popconfirm>
        <el-popconfirm :width="250" title="¿Deseas eliminar este registro?">
          <template #reference>
            <Button type="button" severity="contrast" rounded
                    class=""
                    raised>
              <template #icon>
                <Icon icon="carbon:trash-can" class="text-2xl text-red-400 hover:text-red-300 "/>
              </template>
            </Button>
          </template>
        </el-popconfirm>
      </template>
    </div>
  </CustomDialog>
</template>
<script setup lang="ts">

import {useGetFoods} from "@/services/foods";
import {onMounted, Ref, ref} from "vue";
import {useSetPlanFood} from "@/services/plans";
interface IProps {
  foodPlans: Record<string, any>[]
}
const props = defineProps<IProps>();
const emit=defineEmits(["updatedPlanFood"])

const {foods, query, getFoods} = useGetFoods();
const {updatePlanFood, key} = useSetPlanFood(emit);



const initData = async () => {
  getFoods().then(() => {
    const prevFoods = props.foodPlans.map((fp: any) => ({
      ...fp,
      id: fp.foodId,
      name: fp.food?.name
    }))
    foods.value.push(...prevFoods)
  });

}

const onSearchFood = async ({value}: { value: string }) => {
  query.search(value);
  await initData();
}

const updateFoodPlan = async (foodPlanToUpdate: Record<string, any>) => {
  await updatePlanFood(foodPlanToUpdate)
}
onMounted(() => {

})

</script>