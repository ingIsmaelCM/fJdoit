<template>

  <CustomDialog title="Registrar Alimento" :key="key" >
    <template #button>
      <Button severity="contrast" title="Nuevo alimento">
        <Icon icon="ic:twotone-playlist-add" class="text-2xl"/>
      </Button>
    </template>
    <FoodForm @foodCreated="foodCreated"/>
  </CustomDialog>
</template>

<script setup lang="ts">
import {ref} from "vue";
import FoodForm from "@/components/foods/FoodForm.vue";

const key=ref(0);
const emit=defineEmits(["foodCreated"])
const foodCreated=()=>{
  key.value++;
  emit("foodCreated");
}
</script>