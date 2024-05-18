<template>
  <div class="flex h-full p-8 bg-blue-100 ">

    <div class="w-2/5  pt-4 justify-center">
      <form @submit.prevent="getDiet" class="max-w-md grid grid-cols-12 gap-x-2 gap-y-8">
        <FloatLabel class="col-span-3">
          <InputNumber inputClass="!w-full dark:bg-gray-700" class="!w-full" id="rate" mode="decimal" locale="en-US"
                       :min-fraction-digits="2" :max-fraction-digits="2" v-model="input.proteins" :allowEmpty="false"/>
          <label for="rate">Proteínas</label>
        </FloatLabel>
        <FloatLabel class="col-span-3">
          <InputNumber inputClass="!w-full dark:bg-gray-700" class="!w-full" id="rate" mode="decimal" locale="en-US"
                       :min-fraction-digits="2" :max-fraction-digits="2" v-model="input.carbohidrates" :allowEmpty="false"/>
          <label for="rate">Carbohidratos</label>
        </FloatLabel>
        <FloatLabel class="col-span-3">
          <InputNumber inputClass="!w-full dark:bg-gray-700" class="!w-full" id="rate" mode="decimal" locale="en-US"
                       :min-fraction-digits="2" :max-fraction-digits="2" v-model="input.fat" :allowEmpty="false"/>
          <label for="rate">Grasas</label>
        </FloatLabel>
        <FloatLabel class="col-span-3">
          <InputNumber inputClass="!w-full dark:bg-gray-700" class="!w-full" id="rate" mode="decimal" locale="en-US"
                       :min-fraction-digits="2" :max-fraction-digits="2" v-model="input.maxFoods" :allowEmpty="false"/>
          <label for="rate">Cantidad</label>
        </FloatLabel>
        <div class="col-start-7 col-end-13">
          <Button type="submit" class="w-full bg-soft hover:bg-opacity-80 text-gray-200" severity="contrast">
            <div class="flex items-center space-x-2 px-1">
              <span>Generar</span>
            </div>
          </Button>
        </div>
        <input type="submit" class="hidden">
      </form>

    </div>
  </div>


</template>
<script setup lang="ts">
import {ref, Ref} from "vue";
import foods from "@/data/foods.json"

  interface IInput{
    proteins: number;
    fat: number;
    carbohidrates: number;
    maxFoods:number;
  }


  const input: Ref<IInput>=ref({
    proteins: 0,
    fat: 0,
    carbohidrates: 0,
    maxFoods:3
  })
const foodData = foods.map((f, ind) =>
    ({id: ind+1, name: f.name, proteins: f.proteins, fat: f.fat, carbohidrates: f.carbohidrates}))

const getDiet = () => {
  const {maxFoods: max}= input.value;
  const params=input.value;
  let copyFood = [...foodData.slice().sort(() => Math.random() - 0.2)]
  let sum = {proteins: 0, carbohidrates: 0, fat: 0};
  let results: any[] = []
  let index = 0;
  let fixes = false;
  let amountFound=0;
  while ((amountFound < max && index < foodData.length) && !fixes) {
    index++;
    const foundFood = copyFood.find((food => {
      return Object.keys(sum).every((key)=>{
        return food[key]<=(params[key]-sum[key])
      })
    }))
    foundFood && (results.push(foundFood))
    foundFood && (copyFood = copyFood.filter(f => f !== foundFood))
    foundFood && (amountFound++)
    sum = results.reduce((a, b) =>
            ({
              proteins: a.proteins + b.proteins,
              carbohidrates: a.carbohidrates + b.carbohidrates,
              fat: a.fat + b.fat,
            }),
        {proteins: 0, carbohidrates: 0, fat: 0});
    Object.keys(sum).forEach(key => {
      sum[key] = Number(sum[key].toFixed(2));
    })
    fixes = Object.keys(sum).every(key => {
      return (params[key] - sum[key]) < 4
    })
    if ((index === foodData.length || amountFound === max) && !fixes && results.length) {
      copyFood = [...foodData.slice().sort(() => Math.random() - 0.2)];
      sum = {proteins: 0, carbohidrates: 0, fat: 0}
      index = 0;
      results=[]
      amountFound=0;
    }
  }
  console.log(results)
  return results;
}
</script>