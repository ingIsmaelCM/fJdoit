<template>
  <CustomDialog title="Composición Nutricional" :width="300">
    <template #button>
      <button class="  !bg-transparent   !border-none" circle title="Detalles">
        <Icon icon="carbon:touch-1" class="text-lg"/>
      </button>
    </template>
    <section class=" border-2 shadow-lg mx-auto margin-4 w-[370px] p-4 ">
      <div class="flex items-center space-x-2 border-b-8 p-2 border-dark ">
        <qrcode-vue :value="qrValue" :size="120" level="H"/>
        <header class="pb-2 mb-2 w-full">
          <h1 class="font-semibold text-lg my-2 leading-5 line-clamp-3">{{ food.name }}</h1>
          <p class="flex justify-between"><span>Grupo:</span> <b>{{ food.categoryName }}</b></p>
          <p class="flex justify-between"><span>Cant./Porción:</span> <b>{{ food.portion }}</b></p>
        </header>
      </div>
      <div class="border-black text-sm pb-1">
        <div class="text-right font-bold pt-1 pb-1">Valor Aproximado</div>
        <hr class="border-gray-500"/>
        <template v-for="nutrient of Object.entries(ENutrientKey)" :key="nutrient.at(0)">
          <div class="flex justify-between py-1">
            <div>
              <span class="font-bold">{{ nutrient[1] }}</span>
            </div>
            <div class="font-bold">{{ food[nutrient[0]] + getMeasure(nutrient[0]) }}</div>
          </div>
          <hr class="border-gray-500"/>
        </template>

      </div>
    </section>
  </CustomDialog>
</template>
<script setup lang="ts">
import {ENutrientKey, IFoodView} from "@/interfaces/ModelInterfaces.ts";
import QrcodeVue from 'qrcode.vue'
import {computed} from "vue";

interface IProps {
  food: IFoodView
}

const props=defineProps<IProps>()
const getMeasure = (key: string) => {
  const measures = {cholesterol: 'mg', calories: 'kCal'};
  return measures[key] || 'g'
}

const qrValue=computed(()=>{
  const header=`${props.food.name.toUpperCase()}\nGrupo: ${props.food.categoryName}\nPorción: ${props.food.portion}\n\n`
  return Object.entries(ENutrientKey).reduce((a: string, b: any)=>{
    return a+`${b[1]}: ${props.food[b[0]]} \n`
  },header);
})


</script>