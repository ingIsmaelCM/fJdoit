<template>
  <div class="w-full flex transition-all" :class="{'blur':!patient.id}">
    <div
        class="h-max w-72 rounded-xl border bg-white dark:bg-gray-700 dark:border-gray-500  overflow-hidden relative">
      <div class="w-full h-16 bg-gray-50 dark:bg-gray-500 relative ">
        <div class="flex justify-between h-16 items-center px-2" v-if="patient.id">
          <div class="w-8">
            <el-tag type="primary">{{ patient.code }}</el-tag>
          </div>
          <div class="w-8">
            <EditPatient @patientUpdated="$emit('patientUpdated')" :prev-patient="patient"/>
          </div>

        </div>

      </div>
      <h1 class=" text-center text-base uppercase font-bold ellipsis px-4 py-4"
          v-tooltip="patient.fullname">{{ patient.fullname }}</h1>

      <div class="w-full grid grid-cols-6 text-sm">
        <!-- Item -->
        <div class="icon-part dark:!bg-gray-600 dark:!border-gray-800">
          <Icon icon="tabler:id" class="text-2xl"/>
        </div>
        <div class="data-part dark:!border-gray-800">
          {{ patient.dni || "N/D" }}
        </div>
        <!-- Item -->
        <div class="icon-part dark:!bg-gray-600 dark:!border-gray-800">
          <Icon icon="tabler:phone" class="text-2xl"/>
        </div>
        <div class="data-part dark:!border-gray-800">
          {{ patient.phone || "N/D" }}
        </div>
        <!-- Item -->
        <div class="icon-part dark:!bg-gray-600 dark:!border-gray-800">
          <Icon icon="tabler:mail" class="text-2xl"/>
        </div>
        <div class="data-part dark:!border-gray-800 ">
          <div class="ellipsis ">
            {{ patient.email || "N/D" }}
          </div>
        </div>
        <!-- Item -->
        <div class="icon-part dark:!bg-gray-600 dark:!border-gray-800">
          <Icon
              :icon="patient.gender == EInfoGender.Masculino ? 'tabler:gender-male' :
              (patient.gender == EInfoGender.Femenino ? 'tabler:gender-female' : 'tabler:gender-bigender')"
              class="text-2xl"/>
        </div>
        <div class="data-part dark:!border-gray-800 ">
          <div class="ellipsis ">
            {{ patient.gender || 'N/D' }}
          </div>
        </div>

        <!-- Item -->
        <div class="icon-part dark:!bg-gray-600 dark:!border-gray-800">
          <Icon icon="tabler:map-pin" class="text-2xl"/>
        </div>
        <!-- Item -->
        <div class="data-part dark:!border-gray-800 py-1   h-16 !flex !items-center ">
          <span class="!line-clamp-3 text-sm leading-4">{{ address }} </span>
        </div>
        <!-- Item -->
        <div class="icon-part dark:!bg-gray-600 dark:!border-gray-800">
          <Icon icon="ph:note" class="text-2xl"/>
        </div>
        <div class="data-part dark:!border-gray-800 ">
          <div class="ellipsis ">
            {{ patient.note || 'N/D' }}
          </div>
        </div>

      </div>


    </div>
  </div>
</template>

<script setup lang="ts">

import {EInfoGender, IPatientView} from "@/interfaces/ModelInterfaces.ts";
import EditPatient from "@/components/patients/EditPatient.vue";
import {computed} from "vue";

interface IProps {
  patient: IPatientView
}

const props = defineProps<IProps>();
const address = computed(() =>
    `${props.patient.line1}${props.patient.line2 ? ", "
        + props.patient.line2 : ''}, ${props.patient.municipe}, ${props.patient.province}`)

</script>
<style scoped>
.icon-part {
  @apply col-span-1 bg-gray-50 dark:bg-gray-600 min-h-10 py-1.5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-center;
}

.data-part {
  @apply col-span-5 min-h-10 border-t border-gray-100 dark:border-gray-800 flex items-center px-2;
}
</style>