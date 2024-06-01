<template>
  <div class="p-2 grid grid-cols-2">

  </div>


</template>
<script setup lang="ts">
  import {useGetFoods} from "@/services/foods";

  const {foods, food, query, getFoods}=useGetFoods();


</script>