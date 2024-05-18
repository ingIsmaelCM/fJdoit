<template>

  <CustomDialog title="Actualizar Alimento" :key="key" >
    <template #button>
      <Button severity="contrast" title="Actualizar alimento">
        <Icon icon="carbon:edit" class="text-2xl"/>
      </Button>
    </template>
    <FoodForm @foodUpdated="foodUpdated" action="Actualizar" :prev-food="prevFood"
              confirmMessage="Confirme que desea actualizar el registro"/>
  </CustomDialog>
</template>

<script setup lang="ts">
import {ref} from "vue";
import FoodForm from "@/components/foods/FoodForm.vue";
import {IFoodView} from "@/interfaces/ModelInterfaces.ts";

interface IProps{
  prevFood: IFoodView
}

defineProps<IProps>();

const key=ref(0);
const emit=defineEmits(["foodUpdated"])
const foodUpdated=()=>{
  key.value++;
  emit("foodUpdated");
}
</script>