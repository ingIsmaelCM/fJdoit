

<template>
  <div class="main-body " id="planMenu">
    <div class="flex justify-between space-x-4 mb-2 ">
      <div class="h-10 w-1/6 mr-2 flex flex-col justify-center">
        <span class="text-sm ellipsis">{{ patient?.lastname }}, {{ patient?.name?.at(0) }}.</span>
        <span>{{ `${patient?.evals?.at(0)?.weight || 'N/D'}kg | ${getOld(String(patient?.dob))}` }}</span>
      </div>
      <div class="meal-type h-10 w-1/4">Desayuno</div>
      <div class="meal-type h-10 w-1/4">Almuerzo</div>
      <div class="meal-type h-10 w-1/4">Cena</div>
    </div>
    <div class="grid grid-cols-10 gap-2 h-[calc(100%-3.5rem)] ">
      <div class="col-span-10 flex h-full justify-between space-x-4" v-for="planD in planData">
        <div class="flex items-center justify-center bg-gray-200 w-1/6 mr-2 border-none">
          <div class="day-name h-12 w-full">{{ planD.day }}</div>
        </div>
        <div
            class="h-full w-1/4 bg-gray-200 space-y-0 flex flex-col justify-center p-1  text-sm lowercase overflow-hidden  "
            v-for="plan in planD.foodPlans">
          <span class="ellipsis" v-for="food in plan">
            {{ food }}
          </span>
        </div>

      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import {IPatientView} from "@/interfaces/ModelInterfaces.ts";
import moment from "moment-timezone";
interface IProps{
  patient:IPatientView,
  planData: any[],
}


defineProps<IProps>();
function getOld(dob: string): string {
  if (!dob) return "N/D"
  return moment().diff(moment(dob, 'YYYY-MM-DD'), 'years') + " años";
}

</script>