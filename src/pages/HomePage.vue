<template>
  <div class="p-2 grid grid-cols-12 gap-4">
    <HomePlans/>
    <HomeCalendar/>
    <div class="col-span-8 flex space-x-4">
      <div class="w-2/3">
        <HomePatients/>
      </div>
      <HomeWhatsapp/>
    </div>
    <div class="col-span-4">
      <HomeTask />
    </div>
  </div>


</template>
<script setup lang="ts">
import HomePlans from "@/components/dashboard/HomePlans.vue";
import HomeCalendar from "@/components/dashboard/HomeCalendar.vue";
import HomePatients from "@/components/dashboard/HomePatients.vue";
import HomeWhatsapp from "@/components/dashboard/HomeWhatsapp.vue";
import HomeTask from "@/components/dashboard/HomeTask.vue";

</script>