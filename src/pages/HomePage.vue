<template>
  <div class="p-2 grid grid-cols-12 gap-4 relative">
    <div class="absolute right-2 top-0">
      <TourComponent hint="Vista Principal" name="" :steps="Object.values(tour)"/>
    </div>
    <div id="plans" class="col-span-8">
    <HomePlans/>
    </div>
    <div id="calendar" class="col-span-4">
      <HomeCalendar/>
    </div>
    <div class="col-span-8 flex space-x-4">
      <div class="w-2/3" id="lastPatients">
        <HomePatients/>
      </div>
      <div id="whatsapp" class="w-1/2">
        <HomeWhatsapp/>
      </div>
    </div>
    <div class="col-span-4" id="tasks">
      <HomeTask/>
    </div>
  </div>


</template>
<script setup lang="ts">
import {homeTour} from "@/hints/tours/homeTour.ts";
import HomePlans from "@/components/dashboard/HomePlans.vue";
import HomeCalendar from "@/components/dashboard/HomeCalendar.vue";
import HomePatients from "@/components/dashboard/HomePatients.vue";
import HomeWhatsapp from "@/components/dashboard/HomeWhatsapp.vue";
import HomeTask from "@/components/dashboard/HomeTask.vue";
import {onMounted, ref} from "vue";
import TourComponent from "@/components/commons/TourComponent.vue";

const tour = ref({});

onMounted(() => {
  tour.value = homeTour
})

</script>