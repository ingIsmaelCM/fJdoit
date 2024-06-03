<template>
  <CustomDialog title="Añadir Alimento al Plan" @show="initData">
    <template #button>
      <Button type="button" severity="contrast" rounded
              class="text-primary hover:text-soft"
              raised>
        <template #icon>
          <Icon icon="ic:twotone-playlist-add" class="text-2xl "/>
        </template>
      </Button>
    </template>
    <form class="grid grid-cols-12 gap-x-4 gap-y-8 p-4 pt-8"
          @submit.prevent="()=>{}"
    >
      <FloatLabel class="col-span-3">
        <InputNumber inputClass="!w-full dark:bg-gray-700" class="!w-full" id="portion"
                     v-model="newFood.portion" :min="0.5" :max="2.5" :allowEmpty="false" locale="en-US"
                     mode="decimal" :min-fraction-digits="2" :max-fraction-digits="2"/>
        <label for="portion">Porción</label>
      </FloatLabel>
      <FloatLabel class="col-span-3">
        <Dropdown v-model="newFood.day" :options="Object.values(EPlanDay)" :disabled="lockday"
                  inputClass="!w-full" class="!w-full dark:bg-gray-700 hide-arrow" panelClass="dark:bg-gray-800"/>
        <label><sup class="text-red-400">*</sup>Día</label>
      </FloatLabel>
      <FloatLabel class="col-span-6">
        <Dropdown v-model="newFood.id" :options="foods" option-label="name" option-value="id"
                  filter @filter="(evt:any)=>$debounce(()=>onSearchFood(evt),500)(evt)" :auto-filter-focus="true"
                  inputClass="!w-full" class="!w-full dark:bg-gray-700 hide-arrow" panelClass="dark:bg-gray-800"/>
        <label><sup class="text-red-400">*</sup>Alimento</label>
      </FloatLabel>
      <el-popconfirm width="160" title="¿Añadir al plan?" @confirm="()=>addFood()">
        <template #reference>
          <Button type="button" severity="contrast"
                  class="bg-soft hover:bg-opacity-80 text-gray-200 col-start-9 col-end-13"
                  raised label="Añadir"/>
        </template>
      </el-popconfirm>
    </form>
  </CustomDialog>
</template>

<script setup lang="ts">

import {ref, watch} from "vue";
import {EPlanDay} from "@/interfaces/ModelInterfaces.ts";
import {useGetFoods} from "@/services/foods";
import emitter from "@/helpers/emitter.ts";
import utils from "@/helpers/utils.ts";

interface IProps {
  day?: EPlanDay,
  lockday?: boolean,
  plan?: Record<string, any>;
}

const props = defineProps<IProps>();

const {foods, query, getFoods} = useGetFoods();

const food = ref();
const getFromPortion = (portion: number, value: number): number =>
    Number((Number(portion) * Number(value)).toFixed(2));

const newFood = ref({
  name: "",
  id: "",
  portion: 0.5,
  day: EPlanDay.L
});

const initNewFood = () => {
  newFood.value = {
    ...newFood.value,
    name: food.value.name,
    originalProt: food.value.proteins,
    originalCarb: food.value.carbohidrates,
    originalFat: food.value.fat,
    proteins: getFromPortion(newFood.value.portion, food.value.proteins),
    fat: getFromPortion(newFood.value.portion, food.value.fat),
    carbohidrates: getFromPortion(newFood.value.portion, food.value.carbohidrates),
    calories: getFromPortion(newFood.value.portion, food.value.calories),
  }
}


const initData = async () => {
  query.order("priority").desc(true);
  props.day && (newFood.value.day = props.day)
  await getFoods();
}

const onSearchFood = async ({value}: { value: string }) => {
  query.search(value);
  await initData();
}
const addFood = () => {
  if (newFood.value.portion && newFood.value.id && newFood.value.day) {
    emitter.emit("addDiet", {newFood: newFood.value, plan: props.plan});
    food.value = null;
    newFood.value = {
      name: "",
      id: "",
      portion: 0.5,
      day: EPlanDay.L
    };
  } else {
    utils.showNoti({
      type: "error",
      title: "Revise los datos",
      message: "Los datos ingresados no son correctos",
      position: "bottom-right",
      duration: 3500
    })
  }
}
const sumValue = () => {
  food.value = foods.value.find((f: any) => f.id === newFood.value.id);
  if (food.value) {
    initNewFood();
  }
}

watch(() => newFood.value.id, () => {
  sumValue()
})
watch(() => newFood.value.portion, () => {
  sumValue()
})
</script>
