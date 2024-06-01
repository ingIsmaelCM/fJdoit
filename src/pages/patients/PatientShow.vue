<template>
  <div class="grid grid-cols-5  items-center">
    <div class="col-span-2 ">
      <PatientDetail @patientUpdated="initData" :patient="patient"/>
    </div>
    <div class="col-span-3">
      <BodyComponent :key="patient.id" :eval="patient.eval" />
    </div>
  </div>
  <div class="w-full h-40 bg-red-400 border-b-2 border-sky-500">
  </div>
</template>

<script setup lang="ts">
import {onMounted} from "vue";
import {useRoute} from "vue-router";
import {useGetPatients} from "@/services/patients";
import PatientDetail from "@/components/patients/PatientDetail.vue";
import BodyComponent from "@/components/patients/BodyComponent.vue";

const route = useRoute();
const {patient, findPatient} = useGetPatients();

onMounted(async () => {
  await initData();
})

const initData = async () => {
  const patientId = route.params.id;
  await findPatient(patientId);
}


</script>