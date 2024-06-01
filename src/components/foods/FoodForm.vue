<template>

  <form @submit.prevent="(evt:any)=>onConfirmSubmit(evt, confirmMessage, handleAction)"
        class="grid grid-cols-12 gap-y-8 gap-x-2 p-4"
  >

    <FloatLabel class="col-span-12 ">
      <InputText id="name" v-model="food.name" class="w-full dark:bg-gray-700" :invalid="$vFoodRule.name.$error"/>
      <label for="name"><sup class="text-red-400">*</sup>Nombre del alimento</label>
    </FloatLabel>
    <FloatLabel class="col-span-8">
      <Dropdown id="clientId" v-model="food.categoryId" :required="true" :options="categories" checkmark
                optionValue="id" optionLabel="name" :dropdown-icon="undefined" :invalid="$vFoodRule.categoryId.$error"
                @update:modelValue="$emit('onCategorySelect', food.categoryId)"
                inputClass="  !w-full dark:bg-gray-700" class="!w-full dark:bg-gray-700 hide-arrow"
                panelClass="dark:bg-gray-700" filter autoFilterFocus :loading="$global.getLoading"
                @filter="(evt:any)=>$debounce(onSearchCategory, 500)(evt)"/>
      <label for="clientId"><sup class="text-red-400">*</sup>Categoría</label>
    </FloatLabel>
    <FloatLabel class="col-span-4 ">
      <InputText id="portion" v-model="food.portion" class="w-full dark:bg-gray-700" readonly/>
      <label for="portion"><sup class="text-red-400">*</sup>Porción</label>
    </FloatLabel>
    <FloatLabel class="col-span-4" v-for="field in Object.entries(ENutrientKey)">
      <InputNumber inputClass="!w-full dark:bg-gray-700" class="!w-full" :id="field[0]"
                   :invalid="$vFoodRule[field[0]].$error"
                   v-model="food[field[0]]" :min="0" :allowEmpty="false" locale="en-US"
                   mode="decimal" :min-fraction-digits="2" :max-fraction-digits="2"/>
      <label :for="field[0]">{{ field[1] }}</label>
    </FloatLabel>
    <Button type="submit" severity="contrast"
            class="bg-soft hover:bg-opacity-80 text-gray-200 col-start-9 col-end-13"
            raised :label="action"/>
    <input type="submit" value="" class="hidden">
  </form>
</template>

<script setup lang="ts">
import {ENutrientKey, IFoodView} from "@/interfaces/ModelInterfaces.ts";
import {onMounted} from "vue";
import {useGetCategories, useSetFood} from "@/services/foods";
import useConfirmService from "@/services/ConfirmService.ts";

interface IProps {
  prevFood?: IFoodView;
  action?: string;
  confirmMessage?: string
}

const props = withDefaults(defineProps<IProps>(), {
  action: "Registrar",
  confirmMessage: "Confirme el registro de los datos"
});

const emit = defineEmits(["foodCreated", "foodUpdated"])
const {food, $vFoodRule, createFood, updateFood} = useSetFood(emit);
const {onConfirmSubmit} = useConfirmService()
const {getCategories, categories, query: catQuery} = useGetCategories();

const onSearchCategory = async ({value}: { value: string }) => {
  catQuery.search(value);
  await getCategories();
}


const handleAction = async () => {
  if (food.value.id) {
    await updateFood()
  } else {
    await createFood()
  }
}

onMounted(async () => {
  if (props.prevFood) {
    food.value = props.prevFood
    Object.keys(ENutrientKey).forEach((key: string) => {
      food.value[key] = Number(food.value[key]) || 0.00
    });
  }
  await getCategories();
})

</script>