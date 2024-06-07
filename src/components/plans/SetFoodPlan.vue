<template>
  <DataTable :value="diets" group-rows-by="day" row-group-mode="rowspan" size="small"
             scrollable scrollHeight="370px" tableStyle="width:100%" editMode="cell"
             @cell-edit-complete="onCellEditComplete" :key="diets.length">
    <Column field="day" header="Día" class="bg-primary !text-gray-200" body-class="!py-1">
      <template #body="slotProps">
        <div class="flex flex-col ">
          <span class="font-bold text-lg">{{ slotProps.data.day }}</span>
          <div class="flex justify-between w-[6.5rem]" v-for="total in getTotal(slotProps.data.day).value"
               :key="total.key">
            <b>{{ total.key }}</b><span>{{ total.value }}g</span>
          </div>
        </div>
      </template>
    </Column>
    <Column field="portion" header="Porción" class="!w-20" header-class="bg-primary !text-gray-200 !py-1"
            body-class="!py-1">
      <template #editor="{ data, field }">
        <InputNumber inputClass="!w-full dark:bg-gray-700" class="!w-full !px-0" id="maxFoods"
                     v-model="data[field]" :min="0.5" :max="2.5" :allowEmpty="false" locale="en-US"
                     mode="decimal" :min-fraction-digits="2" :max-fraction-digits="2"/>
      </template>
    </Column>
    <Column field="name" header="Alimento" class="whitespace-nowrap ellipsis !max-w-72 "
            header-class="bg-primary !text-gray-200 !py-1" body-class="!py-1">
      <template #editor="{ data }">
        <Dropdown v-model="data.id" :options="foods" option-label="name" option-value="id"
                  filter @filter="(evt:any)=>utils.debounce(()=>onSearchFood(evt),500)(evt)" :auto-filter-focus="true"
                  inputClass="!w-full" class="!w-full dark:bg-gray-700 hide-arrow" panelClass="dark:bg-gray-800"/>
      </template>
    </Column>
    <Column field="proteins" header="Prot." class="w-10" header-class="bg-primary !text-gray-200 !py-1"
            body-class="!py-1"/>
    <Column field="carbohidrates" header="Carb." class="w-10" header-class="bg-primary !text-gray-200 !py-1"
            body-class="!py-1"/>
    <Column field="fat" header="Gras." class="w-10" header-class="bg-primary !text-gray-200 !py-1"
            body-class="!py-1"/>
    <Column class="w-10" header-class="bg-primary !text-gray-200 !py-1"
            body-class="!py-1" frozen>
      <template #body="{data}">
        <div class="flex space-x-2">
          <el-popconfirm width="300" title="¿Desea remover este alimento?" @confirm="()=>removeFood(data)">
            <template #reference>
              <button class="  !bg-transparent   !border-none" circle title="Remover">
                <Icon icon="typcn:times" class="text-xl text-red-600"/>
              </button>
            </template>
          </el-popconfirm>
        </div>
      </template>
    </Column>
  </DataTable>
</template>
<script setup lang="ts">
import {computed, onMounted, onUnmounted, ref, watch} from "vue";
import SocketService from "@/services/SocketService.ts";
import {useGetFoods} from "@/services/foods";
import utils from "@/helpers/utils.ts";
import emitter from "@/helpers/emitter.ts";

const {foods, query: foodQuery, getFoods} = useGetFoods();
const diets = ref(new Array(0))

const initData = async () => {
  await getFoods();
  foods.value.push(...diets.value)
}

const onSearchFood = async ({value}: { value: string }) => {
  foodQuery.search(value);
  await initData();
}

const showError = (message: string) => {
  utils.showNoti({
    type: "error",
    title: "No se pudo añadir",
    message: message,
    position: "bottom-right",
    duration: 3500
  })
}


const getTotal = (day: string) => {
  return computed(() => {
    let proteins = 0;
    let fat = 0;
    let carbohidrates = 0;
    diets.value.forEach((diet: any) => {
      if (diet.day === day) {
        proteins += diet.proteins;
        fat += diet.fat;
        carbohidrates += diet.carbohidrates;
      }
    })
    return [
      {key: "Prot.", value: Number(proteins.toFixed(2))},
      {key: "Carb.", value: Number(carbohidrates.toFixed(2))},
      {key: "Gras.", value: Number(fat.toFixed(2))},
    ]
  })

}

const removeFood = (food: any) => {
  diets.value = diets.value.filter((diet: any) => diet.id !== food.id)
}
const onCellEditComplete = ({data, newData}: any) => {
  const dietIndex = diets.value.indexOf(data);
  const newFood: any = foods.value.find((f: any) => f.id === newData.id)
  if (dietIndex > -1) {
    diets.value[dietIndex] = {
      ...newData,
      proteins: utils.formatNumber(newData.portion * (newFood.originalProt || newFood?.proteins)),
      carbohidrates: utils.formatNumber(newFood.portion * (newFood.originalCarb || newFood?.carbohidrates)),
      fat: utils.formatNumber(newData.portion * (newFood.originalFat || newFood?.fat)),
      name: newFood?.name || newData.name
    };
  }
}

watch(() => diets.value, () => {
  emitter.emit("dietsChanged", diets.value);
}, {
  deep: true
})
onMounted(() => {
  emitter.on("updatedDiets", (updatedDiet: any) => {
    diets.value = updatedDiet;
  })
  emitter.on("addDiet", ({newFood}: any) => {
    const filteredDiet = diets.value.filter((d: any) => d.day === newFood.day);
    if (filteredDiet.some((fd: any) => fd.id === newFood.id)) {
      showError("Este alimento ya fue añadido");
    } else if (filteredDiet.length >= 5) {
      showError("En un día no se pueden añadir más de cinco alimentos")
    } else {
      diets.value.push(newFood)
    }
  })
  SocketService.getInstance().getFromChannel("planSuggestion", (data: any) => {
    diets.value = data;
    initData();
  })
})

onUnmounted(()=>{
  emitter.off("updatedDiets");
  emitter.off("addDiet");
})
</script>