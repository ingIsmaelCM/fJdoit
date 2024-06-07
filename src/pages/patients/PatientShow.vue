<template>
  <div class="grid grid-cols-5 gap-y-6  items-center">
    <div class="col-span-2 ">
      <PatientDetail @patientUpdated="initData" :patient="patient"/>
    </div>
    <div class="col-span-3 h-full">
      <PatientNutrientChart :plans="patientPlans||[]"/>
    </div>
    <div class="col-span-2 flex items-center justify-center h-full">
      <EvalCard :eval="patient.eval"/>
    </div>
    <div class=" col-span-3 h-48 border-gray-200 shadow-lg rounded-lg overflow-hidden">
      <PatientPlan :plans="patientPlans||[]"/>
    </div>
  </div>

</template>

<script setup lang="ts">
import {onMounted} from "vue";
import {useRoute} from "vue-router";
import {useGetPatients} from "@/services/patients";
import PatientDetail from "@/components/patients/PatientDetail.vue";
import PatientPlan from "@/components/patients/PatientPlan.vue";
import PatientNutrientChart from "@/components/patients/PatientNutrientChart.vue";
import EvalCard from "@/components/evals/EvalCard.vue";

const route = useRoute();
const {patient, patientPlans, getPatientPlans, findPatient} = useGetPatients();

onMounted(async () => {
  await initData();
})

const initData = async () => {
  const patientId = route.params.id;
  await findPatient(String(patientId));
  await getPatientPlans(String(patientId));
}


</script>