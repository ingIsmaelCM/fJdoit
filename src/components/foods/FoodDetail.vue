<template>
  <CustomDialog title="Composición Nutricional" :width="300">
    <template #button>
      <button class="  !bg-transparent   !border-none" circle title="Detalles">
        <Icon icon="carbon:touch-1" class="text-lg"/>
      </button>
    </template>
    <section class=" border-2 shadow-lg mx-auto margin-4 w-[370px] p-4">
      <header class="border-b-8 border-dark pb-2 mb-2">
        <h1 class="font-semibold text-lg text-center my-4 leading-5 line-clamp-2">{{ food.name }}</h1>
        <p class="flex justify-between"><span>Grupo alimenticio:</span> <b>{{ food.categoryName }}</b> </p>
        <p class="flex justify-between"><span>Cantidad por Porción:</span> <b>{{ food.portion }}</b> </p>
      </header>
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


interface IProps {
  food: IFoodView
}
const getMeasure=(key: string)=>{
  const measures={cholesterol: 'mg',calories:'kCal'};
  return measures[key]||'g'
}

defineProps<IProps>()
</script>