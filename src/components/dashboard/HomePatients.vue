<template>
  <div class="flex flex-col space-y-2 p-1.5 border shadow-lg rounded-lg h-[19.7rem]">
    <h1 class="p-1 text-lg font-[400]">Últimos Pacientes</h1>
    <div class="flex items-center justify-between space-x-2" v-for="(patient, index) in patients" :key="patient.id">
      <div class=" rounded-lg shadow-lg p-2 w-12" :class="index%2===0?'bg-primary text-gray-50':'text-primary bg-white'">
        <Icon icon="maki:doctor" class="text-4xl "/>
      </div>
      <div class="flex flex-col justify-center w-full">
        <h1 class="font-bold text-primary ellipsis">{{ patient.fullname }}</h1>
        <h1 class="font-normal text-sm">{{ patient.phone }}</h1>
      </div>
      <div class="">
        <Button rounded class="bg-primary" @click="$router.push({name:'patients_show',params:{id: patient.id}})">
          <template #icon>
            <Icon icon="ion:send" class="text-xl "/>
          </template>
        </Button>
      </div>
    </div>
    <div class="flex items-center justify-between space-x-2" v-for="skeletong in 4-patients.length" :key="skeletong">
      <div class="w-12">
        <Skeleton width="3rem" height="3rem"/>
      </div>
      <div class="flex flex-col justify-center space-y-2 w-full">
        <Skeleton height="1.2rem" width="13.5rem"/>
        <Skeleton height="1rem" width="8rem"/>
      </div>
      <div>
        <Skeleton shape="circle" size="2.2rem"/>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import {useGetPatients} from "@/services/patients";
import {onMounted} from "vue";

const {patients, query, patientFormatter, getPatients} = useGetPatients();

onMounted(() => {
  query.limit(4).order("createdAt")
  getPatients().then()
})
</script>
