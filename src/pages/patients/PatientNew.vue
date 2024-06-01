<template>
  <div class="grid grid-cols-10 gap-x-4">
    <CreatePatient/>
    <div class="col-span-5  flex items-center justify-center">
      <Icon icon="ic:round-person-add-alt-1" class="text-[20rem] text-primary opacity-50"/>
    </div>
  </div>
</template>

<script setup lang="ts">

import CreatePatient from "@/components/patients/CreatePatient.vue";
</script>