<template>
  <div class="flex items-center justify-end px-4 space-x-3 h-full">

    <div class="flex  space-x-3 items-center">
      <button :disabled="!history.back" @click="$router.back()" class="text-gray-50 disabled:text-gray-400">
        <Icon icon="tabler:arrow-back-up" class="text-2xl"/>
      </button>
      <button :disabled="!history.forward" @click="$router.forward()" class="text-gray-50 disabled:text-gray-400">
        <Icon icon="tabler:arrow-forward" class="text-2xl"/>
      </button>
      <button :disabled="$router.currentRoute.value.name==='home'" @click="$router.push('/')"
              class="text-gray-50 disabled:text-gray-400">
        <Icon icon="tabler:home" class="text-2xl hover:scale-105"/>
      </button>
    </div>
    <button class=" text-2xl text-gray-50 cursor-grab ">
      <Icon icon="ri:drag-move-fill" class="draggable"/>
    </button>
  </div>


</template>
<script setup lang="ts">
import {computed} from 'vue';

const history = computed(() => {
  return window.history.state
});

</script>